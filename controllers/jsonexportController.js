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
    // var productObj = req.body
    // console.log("REQ.BODY:", productObj)
    // convert to csv
    // jsonexport(productObj,function(err, csv){
    //   if(err) return console.log(err);
    //   console.log("CSV:", csv);
    //   // send back to front end for download
    //   res.send(csv)
    // });


    // get product from DOM
    var myData = req.body.myData
    var fields = req.body.fields
    console.log("MY DATA:", mydata, "FIELDS: ", fields)
    json2csv({ data: myData, fields: fields }, function(err, csv) {
      if (err) console.log(err);
      console.log(csv);
    });
  }
}

module.exports = jsonexportController