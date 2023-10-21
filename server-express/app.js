const express = require('express')
const app = express()
const port = 5000


const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./API_keys/localizase-b0c83-591dc4e68d1c.json');

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

    let userTagsIds = []

    if (!userDocData.exists) {
        res.send('No such document!')
    } else {
        userTagsIds = userDocData.data().tags
    }
})

app.get('getemalta', (req, res)=>{
    console.log('[getEmAlta] ON')
})

app.listen(port, ()=>{
    console.log('[SERVER] OK')
})