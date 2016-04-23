var Product = require('../models/products')
var jsonexport = require('jsonexport')

var json2csv = require('json2csv');

jsonexportController = {
  convertJson: function (req, res) {

    var fields = ['car', 'price', 'color'];
    var myCars = [
      {
        "car": "Audi",
        "price": 40000,
        "color": "blue"
      }, {
        "car": "BMW",
        "price": 35000,
        "color": "black"
      }, {
        "car": "Porsche",
        "price": 60000,
        "color": "green"
      }
    ];


    console.log("MY DATA:", myCars, "FIELDS: ", fields)
    json2csv({ data: myCars, fields: fields }, function(err, csv) {
      if (err) console.log(err);
      console.log(csv);
      res.send(csv);
    });
  },
  updateProduct: function (req, res) {
    // get product from DOM
    var myCars = req.body.myCars
    var fields = req.body.fields
    // convert to csv
    console.log("MY DATA:", req.body.myCars, "FIELDS:", req.body.fields)
    json2csv({ data: myCars, fields: fields }, function(err, csv) {
      if (err) console.log(err);
      // send back to front end for download
      console.log(csv);
      res.send(csv)
    });
  }
}

module.exports = jsonexportController