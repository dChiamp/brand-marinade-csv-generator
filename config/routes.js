var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var productsController = require('../controllers/productsController');
var jsonexportController = require('../controllers/jsonexportController');
var uploadController = require('../controllers/uploadController');

router.route('/api/products')
  .get(productsController.productsIndex)
  .post(productsController.newProduct)
  // .put(productsController.editProduct) //update 
  .delete(productsController.deleteProduct)

router.route('/api/convert')
  .get(jsonexportController.convertJson)
  .post(jsonexportController.generateProductObj)
  // .post(jsonexportController.updateProduct)

// router.route('/api/upload')
//   .get(uploadController.getAllProducts)
//   .post(uploadController.postProduct);

router.route('/api/upload')
  .get(jsonexportController.getAllProducts)
  .post(jsonexportController.postProduct);

router.route('/api/test')
  .get(jsonexportController.testHelperFnc)

module.exports = router;