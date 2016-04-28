var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var productsController = require('../controllers/productsController');
var jsonexportController = require('../controllers/jsonexportController');

router.route('/api/products')
  .get(productsController.productsIndex)
  .post(productsController.newProduct)
  // .put(productsController.editProduct) //update 
  .delete(productsController.deleteProduct)

router.route('/api/convert')
  .get(jsonexportController.convertJson)
  .post(jsonexportController.updateProduct)

router.route('/api/test')
  .get(jsonexportController.test)
module.exports = router;