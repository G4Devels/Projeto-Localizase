const express = require('express')
const cors = require("cors")
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const app = express()
const port = 5000

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./API_keys/localizase-b0c83-591dc4e68d1c.json');

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()
const storage = getStorage()

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

app.get("/getcoments/:local_ID", async (req, res)=>{
    console.log("[getcoments] ON")
    const local_ID = req.params.local_ID
    const responseList = []

    const docRefLocal = db.collection("locations").doc(`${local_ID}`)

    const querySnapshot = await docRefLocal.get()
    const referencesList = querySnapshot.data().assessments

    for(let x = 0; x<referencesList.length;x++){
        const snapshot = await referencesList[x].get()
        responseList.push(snapshot.data())
    }

    res.send(responseList)

})

app.get("/getnote/:local_ID", async(req, res)=>{
    console.log("[getnote] ON")
    const local_ID = req.params.local_ID
    var averageNote = 0 

    const docRefLocal = db.collection("locations").doc(`${local_ID}`)

    const querySnapshot = await docRefLocal.get()
    const referencesList = querySnapshot.data().assessments

    for(let x = 0; x<referencesList.length;x++){
        const snapshot = await referencesList[x].get()
        averageNote = (averageNote+snapshot.data().note)/(x+1)
    }

    averageNote = averageNote.toFixed(1)
    res.send(averageNote)

})

app.post("/postcoments",async (req, res)=>{
    console.log("[postcoments] ON")
    const {uid, local_id, comment, note} = req.body
    
    // const uid = jsonData.uid //deve ser fornecido no post, é um exemplo tirado do firebase
    // const local_id = jsonData.local_id//deve ser fornecido no post, é um exemplo tirado do firebase
    const docRefNewAssessment= db.collection(`users/${uid}/assessments`).doc(`${local_id}`)
    const docRefLocal = db.collection(`locations`).doc(`${local_id}`)
    const localDoc = await docRefLocal.get()
    const objectAssessment = {
        // "comment" : String(jsonData.comment),
        // "note" : jsonData.note
        "comment" : comment,
        "note" : note
    }

    function double_check(lista, item){
        for(let i = 0;i<lista.length; i++){
            if (lista[i].path == item.path){
                return false
            }
        }
        return true
    }

    if (localDoc.exists){
        const savedAssessments = localDoc.data().assessments || []
        if (savedAssessments.length == 0 || double_check(savedAssessments, docRefNewAssessment)){
            savedAssessments.push(docRefNewAssessment)
        }
        const listAssessmentReference = {"assessments":savedAssessments}
        docRefLocal.set(listAssessmentReference, {merge:true})
        .then(()=>{
            console.log("referencia no locations adicionada")
        })
        .catch((error)=>{
            console.log("Erro ao adicionar 1")
            console.log(error)
        })
    }

   
    docRefNewAssessment.set(objectAssessment, {merge: true})
        .then(()=>{
            console.log("referencia e documento adicionados")
        })
        .catch((error)=>{
            console.log("Erro ao adicionar 2")
            console.log(error)
        })
    

    res.send("Operação realizada sem erros");


})

app.post("/postsavelocations", async (req, res) => {
    console.log("[postsavelocations] ON")
    const { uid, local_id } = req.body

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


app.post('/getTagArray', jsonParser, async (req, res) => {
    console.log('[getTagArray] ON')

    let tag_reference_array = req.body.tag_reference_array
    tag_reference_array = tag_reference_array.map((value, index) => value._path.segments[1])

    var tags_name = tag_reference_array.map(async (tag_ID, index) => {

        const tagRef = db.collection('tags').doc(tag_ID);
        const doc = await tagRef.get();
    
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            return doc.data().name
        }
        
    })

    Promise.all(tags_name)
    .then(values => res.send(values))
    .catch(error => console.log(error))

})


app.post('/getUserTags', jsonParser, async (req, res) => {
    console.log('[getUserTags] ON')

    let userID = req.body.userID

    // const userData = await db.collection('tags').doc('09oF7InGWJRziAEE8Lh5').get();

    // const tagsID = !userData.exists ? console.log('No such document!') : userData.data()

    let listTags = []

    db.collection("tags").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            listTags.push(doc.data());
        });
        res.send(listTags)
    });
    
    
    // const tagsData = tagsID.map(async (tagID, index) => {

    //     // const tagRef = db.collection('tags').doc(tagID);
    //     // const doc = await tagRef.get();
    
    //     // if (!doc.exists) {
    //     //     console.log('No such document!');
    //     // } else {
    //     //     return doc.data().name
    //     // }
    //     return tagID

    // })


    // Promise.all(tagsData)
    // .then(values => {
    //     let userTags = {}
    //     values.forEach((value, index) => userTags[index] = value)
    //     res.send(userTags)
    // })
    // .catch(error => console.log(error))

})



// Função para ler a nota do usuário no banco de dados.
app.post('/postNoteBD', jsonParser, async (req, res) => {
    console.log('[postNoteBD] ON');

    const {userID, localID} = req.body;

    const collectionsUsers = db.collection('users').doc(userID);
    const collectionsAssessmentsOfUsers = collectionsUsers.collection('assessments').doc(localID);

    try {
        const docAssessments =  await collectionsAssessmentsOfUsers.get();

        if (!docAssessments.exists) {
            res.status(404).send('No such document!');
        }
        else{
            res.send(docAssessments.data());
        };

    } catch (error) {
        res.status(500).send("Erro interno do servidor");
    };
});

// se esse local ja estiver salvo no saved excluira o local salvo no firebase
app.post('/deleteSaved', jsonParser, async (req, res) => {
    console.log('[deleteSaved] ON');

    const { userID, localID } = req.body;

    const collectionsUsers = db.collection('users').doc(userID);

    try {
        const docUsers =  await collectionsUsers.get();

        if (docUsers.exists) {
            const savedUser = docUsers.data().saved;

            savedUser.map(referencia => referencia.id).forEach(async id => {
                if (localID === id){
                    const removeSaved = savedUser.filter(value => value.id !== id);
                    await collectionsUsers.update({
                        saved: removeSaved
                    })
                };
            });
            res.send("operação realizada sem erros!");
        }
        else {
            res.status(404).send("no such document");
        };
    } catch (error) {
        res.status(500).send("Erro interno do servidor");
    };
});


// função para calcular a nota média do local, que será chamada toda vez que atualizar a nota.
app.post('/calculationAvarage', jsonParser, async (req, res) => {
    console.log('[calculationAvarage] ON');

    const { localID } = req.body;

    const collectionLocations = db.collection('locations').doc(localID);
    let listNotes = []
    let sumOfGrades = 0

    try {
        const docLocation =  await collectionLocations.get();

        if (docLocation.exists) {
            const assessmentsLocation = docLocation.data().assessments

            for ( const referenciaAssessments of assessmentsLocation){
                const collectionUserAssessments = await referenciaAssessments.get()

                if(collectionUserAssessments.exists){
                    const assessmentsNote = collectionUserAssessments.data().note
                    listNotes.push(assessmentsNote)
                    sumOfGrades += assessmentsNote
                }
            }

            res.send({avarageGrade: (sumOfGrades / listNotes.length).toFixed(1)})
        }
        else {
            res.status(404).send("no such document");
        };
    } catch (error) {
        res.status(500).send("Erro interno do servidor");
    };
});


// esta função verifica se o local ja esta salvo pelo usuário, se estiver seleciona o botão de salvo
app.post('/checkLocationSavedDB', jsonParser, async (req, res) => {
    console.log('[checkLocationSavedDB] ON');

    const { userID, localID } = req.body;

    const collectionsUsers = db.collection('users').doc(userID);

    try{
        const docUsers =  await collectionsUsers.get();

        if (docUsers.exists) {
            const savedUser = docUsers.data().saved;
            
            if (savedUser != undefined){

                savedUser.map(referencia => referencia.id).forEach(id => {
                    if (localID === id){
                        res.send(true)
                    };
                });

            }
            else{
                res.status(404).send("no such document");
            }
        }
        else {
            res.status(404).send("no such document");
        };
    } catch (error) {
        res.status(500).send("Erro interno do servidor");
    };
});


app.post('/postImageProfile', jsonParser, async (req, res) => {
    console.log('[postImage] ON')
    const { userID, photoURL } = req.body;
    const collectionUsers = db.collection('users').doc(userID)

    try {
        
        const docUser = await collectionUsers.get()
        if(docUser.exists){
            collectionUsers.set({ photoURL: photoURL }, { merge: true })
            .then((res)=>{
                res.send("photoURL salva com sucesso")
            })
            .catch((error)=>{
                res.send("erro ao salvar photoURL")
            });
        }
        else{
            res.send("no such document")
        }

    } catch (error) {
        res.status(500).send("Erro interno no servidor!")
    }

    
});

app.post('/getImageProfile', jsonParser, async (req, res) => {
    console.log("[getImageProfile] ON");

    const { userID } = req.body;
    const collectionUsers = db.collection('users').doc(userID)

    try {
        
        const docUser = await collectionUsers.get()
        if(docUser.exists){
            const photoURLProfile = docUser.data().photoURL
            res.send(photoURLProfile)
        }
        else{
            res.send("no such document")
        }

    } catch (error) {
        res.status(500).send("Erro interno no servidor!")
    }
});






app.listen(port, ()=>{
    console.log('[SERVER] OK porta:', port)
})
