const express = require('express')
const app = express()
const port = 5000


const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./API_keys/localizase-b0c83-591dc4e68d1c.json');
const places_key = require('./API_keys/places_api.json')

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()



app.get('/getrecomendados/:userID', async (req, res)=>{

    console.log('[getRecomendados] ON')


    // getting user tags
    const userID = req.params.userID

    const userDocRef = db.collection('users').doc(userID);
    const userDocData = await userDocRef.get()

    let userTagsIDs = []

    if (!userDocData.exists) {
        res.send('No such document!')
    } else {
        userTagsIDs = userDocData.data().tags
    }


    // calculating points of locations
    const locationsRef = db.collection('locations');
    let dataAndPoints = []

    const snapshot = await locationsRef.get();
    if (!snapshot.empty) {
        snapshot.forEach(doc => {
            const tagsLocationIDs = doc.data().tags.map(tagRef => tagRef._path.segments).map(tagID => tagID[1]);

            let tagPoints = tagsLocationIDs.map(locationTagID => {
                if (locationTagID in userTagsIDs) {
                    return 1
                }
            })

            dataAndPoints.push({
                tagPoints: tagPoints.length,
                data: doc.data()
            })

        });
    }
    

    // ordering by tag quantity/points
    dataAndPoints.sort((a, b) => {
        return b.tagPoints - a.tagPoints
    })


    // getting locations data only
    const locationsDataOnly = dataAndPoints.map(location => location.data)


    // sedding ordered locations data
    res.send(locationsDataOnly)

})


app.get('/getemalta', async (req, res)=>{
    console.log('[getEmAlta] ON')

    var local_dict = {}

    const request_details = async (data)=>{
        // console.log(data, JSON.stringify(places_key.key))
        const api_url = JSON.stringify(places_key.url)
        const result =  await fetch(`https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating&place_id=${data}&key=AIzaSyCMJrJhS4l2cYlWoPEMhtF3y929GY8U6C8&reviews_no_translations=false&reviews_sort=newest`)
            // .then((response)=>{
            //     console.log("deu certo")
            //     const data =  response.json();
            //     console.log(data);
            // })
            // .catch((error)=>{
            //     console.log(error)
            // })
        if (result.ok) {
            // console.log("deu certo");
            const data = await result.json();
            // console.log(data);
            local_dict[data.result.name] = data.result.rating;
            // console.log(local_dict);
            const ordered_array = Object.entries(local_dict);
            ordered_array.sort((a,b)=>b[1]-a[1]);
            const ordered_dict = Object.fromEntries(ordered_array);
            // console.log(ordered_dict);
            local_dict = ordered_dict;
            // console.log(local_dict, "Saída");
          } else{
            console.log("Erro na requisição:", result.status, result.statusText, );
          }
    }
    
    const tratement_request = async (list_IDs)=>{
        for (const item of list_IDs) {
            // console.log(item)
            await request_details(item);
            
            if (item == list_IDs[list_IDs.length]){
                break
            }
          }
        //   console.log(local_dict, "Saída 2");
          res.send(JSON.stringify(local_dict))
    }

     // getting local IDs
     try {
        const locationsRef = db.collection('locations'); // Referência à coleção "locations"
        const querySnapshot = await locationsRef.get();
        const locations = []; // Array para armazenar os valores de "local_ID"
        querySnapshot.forEach((doc) => {
            // Para cada documento na coleção, obtenha o campo "local_ID" e adicione ao array
            locations.push(doc.data().local_ID);
        });
        tratement_request(locations)
        
        // console.log(local_dict)
     }catch(error){
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
     }
})

// app.get('/getemalta', async (req, res) => {
//     console.log('[getEmAlta] ON');

//     try {
//         const locationsRef = collection(db, 'locations'); // Referência à coleção "locations"
//         const querySnapshot = await getDocs(locationsRef);

//         const locations = []; // Array para armazenar os valores de "local_ID"

//         querySnapshot.forEach((doc) => {
//             // Para cada documento na coleção, obtenha o campo "local_ID" e adicione ao array
//             locations.push(doc.data().local_ID);
//         });

//         res.json(locations); // Envie os valores de "local_ID" como uma resposta JSON
//     } catch (error) {
//         console.error('Erro ao buscar dados:', error);
//         res.status(500).json({ error: 'Erro ao buscar dados' });
//     }
// });


app.listen(port, ()=>{
    console.log('[SERVER] OK')
})