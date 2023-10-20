var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/recomendados', function(req, res, next) {
  console.log('Pedido recebido [RECOMENDADOS]')
});

module.exports = router;
