var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/emalta', function(req, res, next) {
  console.log('Pedido recebido [EM ALTA]')
});

module.exports = router;
