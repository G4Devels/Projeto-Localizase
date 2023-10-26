const express = require('express')
const cors = require("cors")
const app = express()
const port = 5000


const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./API_keys/localizase-b0c83-591dc4e68d1c.json');

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()

app.use(cors());

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
    var locations = [];
    var newObj;

    // function removeElementosRepetidos(lista) {
    //     const mapa = new Map();
    //     const listaSemRepeticao = [];

    //     for (const item of lista) {
    //         if (!mapa.has(item[propriedade])) {
    //         mapa.set(item[propriedade], true);
    //         listaSemRepeticao.push(item);
    //         }
    //     }

    //     return listaSemRepeticao;
    // }

    function keysToString(obj) {
        const newObj = {};
      
        for (const key in obj) {
          if (Object.hasOwnProperty.call(obj, key)) {
            newObj[String(key)] = obj[key];
          }
        }
      
        return newObj;
      }

    const request_details = async (data)=>{
        // console.log(data, JSON.stringify(places_key.key))
        const result =  await fetch(`https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_address&place_id=${data}&key=AIzaSyCMJrJhS4l2cYlWoPEMhtF3y929GY8U6C8&reviews_no_translations=false&reviews_sort=newest`)
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
            local_dict[data.result.formatted_address] = data.result.rating;
            // console.log(local_dict);
            const ordered_array = Object.entries(local_dict);
            ordered_array.sort((a,b)=>b[1]-a[1]);
            const ordered_dict = Object.fromEntries(ordered_array);
            // console.log(ordered_dict);
            local_dict = ordered_dict;
            // console.log(local_dict, "Saída");
            const local_list = Object.keys(local_dict)
            console.log(local_dict, "\n", local_list)
            // const locationsRef = collection(db, 'locations');
            const locationsRef = db.collection('locations');
            // local_list.forEach(async (datas)=>{
            //     console.log(datas ,"locais")
            //     // const queryLocal = query(locationsRef, where("address", "==", datas))
            //     // const objLocal = await getDocs(queryLocal)
            //     const queryLocal = await locationsRef.where("address", "==", datas).get();
            //     const doc = queryLocal.docs[0]
            //     const objLocal = doc.data()
            //     console.log(objLocal.name, "local")
            //     if(!queryLocal.empty && !locations.includes(newObj)){
            //         // objLocal.forEach((docs)=>{
            //         //     const item = Object.keys(docs.data()).reduce((result, key) => {
            //         //         result[key.toString()] = docs.data()[key];
            //         //         return result;
            //         //       }, {});
            //             newObj = keysToString(objLocal)
            //             console.log(newObj.name, "string keys")
            //             // console.log(item.name)
            //             locations.push(newObj)
                        
            //             // console.log(locations.indexOf(item))
            //         // })
            //     }else{
            //         console.log("Elemento não encontrado")
            //     }
            // })
            for(const datas of local_list){
                console.log(datas ,"locais")
                    // const queryLocal = query(locationsRef, where("address", "==", datas))
                    // const objLocal = await getDocs(queryLocal)
                    const queryLocal = await locationsRef.where("address", "==", datas).get();
                    const doc = queryLocal.docs[0]
                    const objLocal = doc.data()
                    console.log(objLocal.name, "local")
                    if(!queryLocal.empty){
                        // objLocal.forEach((docs)=>{
                        //     const item = Object.keys(docs.data()).reduce((result, key) => {
                        //         result[key.toString()] = docs.data()[key];
                        //         return result;
                        //       }, {});
                            newObj = keysToString(objLocal)
                            console.log(newObj.name, "string keys")
                            const existeNaLista = locations.some(location => location.name === objLocal.name);
                            // console.log(item.name)
                            if (!existeNaLista){
                                locations.push(newObj)
                            }
                            
                            // console.log(locations.indexOf(item))
                        // })
                    }else{
                        console.log("Elemento não encontrado")
                    }

            }
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
        //    console.log(local_dict, "Saída 2");
           res.send(locations)
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