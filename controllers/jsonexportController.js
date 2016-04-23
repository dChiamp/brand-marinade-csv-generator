var Product = require('../models/products')
var jsonexport = require('jsonexport')

jsonexportController = {
  convertJson: function (req, res) {
    var contacts = {
    cars: 12,
    roads: 5,
    traffic: 'slow',
    speed: {
        max: 123,
        avg: 20,
        min: 5
    },
    size: [10,20]
    };

    jsonexport(contacts,function(err, csv){
      if(err) return console.log(err);
      console.log("CSV:", csv);
      res.send(csv)
    });
  },
  updateProduct: function (req, res) {
    // get product from DOM
    var productObj = req.body
    console.log("REQ.BODY:", productObj)
    // convert to csv
    jsonexport(productObj,function(err, csv){
      if(err) return console.log(err);
      console.log("CSV:", csv);
      // send back to front end for download
      res.send(csv)
    });
  }
}

module.exports = jsonexportController