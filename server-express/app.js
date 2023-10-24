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

    const request_details = async (data)=>{
        // console.log(data, JSON.stringify(places_key.key))
        const api_url = JSON.stringify(places_key.url)
        const res =  await fetch(`https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=${data}&key=AIzaSyCMJrJhS4l2cYlWoPEMhtF3y929GY8U6C8`)
            // .then((response)=>{
            //     console.log("deu certo")
            //     const data =  response.json();
            //     console.log(data);
            // })
            // .catch((error)=>{
            //     console.log(error)
            // })
        if (res.ok) {
            console.log("deu certo");
            const data = await res.json();
            console.log(data);
          } else{
            console.log("Erro na requisição:", res.status, res.statusText, );
          }
    }
    
    const tratement_request = async (list_IDs)=>{
        list_IDs.forEach(async (item)=>{
            await request_details(item)
        })
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
        res.send("complete!")
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