const express = require('express')
const app = express()
const port = 5000

const { db } = require('./services/firebaseFirestoreConfig')


app.get('/getrecomendados/:userID', (req, res)=>{
    console.log('[getRecomendados] ON')
    const userID = req.params.userID
})

app.get('getemalta', (req, res)=>{
    console.log('[getEmAlta] ON')
})

app.listen(port, ()=>{
    console.log('[SERVER] OK')
})