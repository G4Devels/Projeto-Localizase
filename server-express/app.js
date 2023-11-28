const express = require('express')
const cors = require("cors")
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
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

app.use(express.json())
app.post('/getrecomendados', jsonParser, async (req, res)=>{

    console.log('[getRecomendados] ON')


    // getting user tags
    const userID = req.body.userID

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
        const result =  await fetch(`https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_address&place_id=${data}&key=AIzaSyCMJrJhS4l2cYlWoPEMhtF3y929GY8U6C8&reviews_no_translations=false&reviews_sort=newest`)
        if (result.ok) {
            const data = await result.json();
            local_dict[data.result.formatted_address] = data.result.rating;
            const ordered_array = Object.entries(local_dict);
            ordered_array.sort((a,b)=>b[1]-a[1]);
            const ordered_dict = Object.fromEntries(ordered_array);
            local_dict = ordered_dict;
            const local_list = Object.keys(local_dict)
            const locationsRef = db.collection('locations');
            for(const datas of local_list){
                const queryLocal = await locationsRef.where("address", "==", datas).get();
                const doc = queryLocal.docs[0]
                const objLocal = doc.data()
                console.log(objLocal.name, "local")
                if(!queryLocal.empty){
                        newObj = keysToString(objLocal)
                        const existeNaLista = locations.some(location => location.name === objLocal.name);
                        if (!existeNaLista){
                            locations.push(newObj)
                        }
                }else{
                    console.log("Elemento não encontrado")
                }

            }
          }else{
            console.log("Erro na requisição:", result.status, result.statusText, );
          }
    }
    
    const tratement_request = async (list_IDs)=>{
        for (const item of list_IDs) {
            await request_details(item);
            
            if (item == list_IDs[list_IDs.length]){
                break
            }
          }
           res.send(locations)
    }

     // getting local IDs
     try {
        const locationsRef = db.collection('locations'); // Referência à coleção "locations"
        const querySnapshot = await locationsRef.get();
        const locations = []; // Array para armazenar os valores de "local_ID"
        querySnapshot.forEach((doc) => {
            // Para cada documento na coleção, obtenha o campo "local_ID" e adicione ao array
            locations.push(doc.data().places_id_api);
        });
        tratement_request(locations)
     }catch(error){
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
     }
})


//post dos comentários no bd

app.post("/postcoments",(req, res)=>{
    console.log("[postcoments] ON")
    const {uid, local_id, comment, note} = req.body
    
    // const uid = jsonData.uid //deve ser fornecido no post, é um exemplo tirado do firebase
    // const local_id = jsonData.local_id//deve ser fornecido no post, é um exemplo tirado do firebase
    const docRefNewAssessment= db.collection(`users/${uid}/assessments`).doc(`${local_id}`)
    const docRefLocal = db.collection(`locations`).doc(`${local_id}`)

    const objectAssessment = {
        // "comment" : String(jsonData.comment),
        // "note" : jsonData.note
        "comment" : comment,
        "note" : note
    }
    console.log(uid+" "+local_id+" "+objectAssessment.comment+" "+objectAssessment.note)
    const listAssessmentReference = {"assessment":[docRefNewAssessment]}
   
    docRefNewAssessment.set(objectAssessment, {merge: true})
        .then(()=>{
            console.log("referencia e documento adicionados")
        })
        .catch((error)=>{
            console.log("Erro ao adicionar")
            console.log(error)
        })
    
    docRefLocal.set(listAssessmentReference, {merge: true})
        .then(()=>{
            console.log("referencia no locations adicionada")
        })
        .catch((error)=>{
            console.log("Erro ao adicionar")
            console.log(error)
        })

    res.send("Operação realizada sem erros");


})

app.post("/postsavelocations", async (req, res) => {
    console.log("[postsavelocations] ON")
    const jsonData = req.body;
    const uid = jsonData.uid;
    const local_id = jsonData.local_id;

    const docRefUserSaverLocation = db.collection(`users`).doc(`${uid}`);

    try {
        // Obtém o documento do usuário
        const userDoc = await docRefUserSaverLocation.get();

        if (userDoc.exists) {
            // Obtém o array existente ou cria um novo se não existir
            const savedArray = userDoc.data().saved || [];

            // Adiciona a nova referência ao array
            const docRefLocationToSave = db.collection("locations").doc(`${local_id}`);
            savedArray.push(docRefLocationToSave);

            // Atualiza o campo "saved" no documento do usuário
            await docRefUserSaverLocation.set({ saved: savedArray }, { merge: true });

            console.log("Referência adicionada com sucesso");
            res.send("Operação realizada sem erros");
        } else {
            console.log("Usuário não encontrado");
            res.status(404).send("Usuário não encontrado");
        }
    } catch (error) {
        console.error("Erro ao adicionar referência:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.post('/localdetail', jsonParser, async (req, res)=>{

    console.log('[localdetail] ON')

    const local_ID = req.body.local_ID

    const localRef = db.collection('locations').doc(local_ID);
    const doc = await localRef.get();

    if (!doc.exists) {
        console.log('No such document!');
    } else {
        res.send( doc.data() );
    }

})

app.listen(port, ()=>{
    console.log('[SERVER] OK porta:', port)
})
