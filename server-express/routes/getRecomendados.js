var express = require('express');
var router = express.Router();

//const { db } = require('../services/firebaseFirestoreConfig');

// POST getRecomendados page.
router.get('/recomendados/', function(req, res, next) {

  // const userID = req.params.userID
  // console.log(userID)
  console.log('Pedido recebido [RECOMENDADOS]')
  res.send('<h1>teste</h1>')

});

module.exports = router;
