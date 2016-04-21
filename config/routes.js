var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var productsController = require('../controllers/productsController');

router.route('/api/products')
  .get(productsController.productsIndex)
  .post(productsController.newProduct)
  // .put(productsController.editProduct) //update 
  .delete(productsController.deleteProduct)

module.exports = router;