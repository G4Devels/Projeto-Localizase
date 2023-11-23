const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 5000


const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./API_keys/localizase-b0c83-591dc4e68d1c.json');

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()



app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}))

app.use( bodyParser.json() );       

app.use(bodyParser.urlencoded({     
  extended: true
})); 

app.post('/getrecomendados', async (req, res)=>{

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
            
            let tagPoints = []

            tagsLocationIDs.forEach(locationTagID => {
                if (userTagsIDs.includes(locationTagID)) {
                    tagPoints.push(1)
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


app.get('getemalta', (req, res)=>{
    console.log('[getEmAlta] ON')
})

app.post('/localdetail', async (req, res)=>{

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
    console.log('[SERVER] OK')
})