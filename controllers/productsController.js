var Product = require('../models/products')

var productsControlller = {
  productsIndex: function (req, res) {
    Product.find({}, function (err, allProducts){
      err ? console.log(err) : res.json(allProducts);
    })
  },
  newProduct: function (req, res) {
    console.log("req.body:", req.body)
    var item = req.body.item
    Product.create({item: item}, 
    function(err, newProduct) { 
      console.log(newProduct)
      err ? console.log(err) : res.json(newProduct);
    })
  },
  // editProduct:
  deleteProduct: function (req, res) {
    // get id from where?
    var id = req.body.id;
    Product.remove({_id: id}, function(err, data){
      err ? console.log(err) : res.json(data);
    })
  }
}

module.exports = productsControlller;