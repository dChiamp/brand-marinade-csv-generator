var Product = require('../models/products')
var json2csv = require('json2csv');
var merge = require('merge');
var testing = require("../converterHelperFunctions.js");
var moment = require('moment');
// moment().format();
// , original, cloned;

var csvTemplateHeaderFields = require('../csvTemplateHeaderFields')
var sizeWeight = require('../sizeWeight');
var colorAbrevs = require('../colorAbrevs');

var masterProductCsvTemplate = [];

var masterArray = []

jsonexportController = {
  convertJson: function (req, res) {
    var finalCsvArray = [].concat.apply([], masterArray);
    json2csv({ data: finalCsvArray, fields: csvTemplateHeaderFields }, 
      function(err, csv) {
        if (err) console.log(err);
        console.log("FINAL CSV", csv);
        res.send(csv);
        masterArray = [];
        finalCsvArray = [];

    });
  },
  test: function (req, res) {
    json2csv({ data: testing(), fields: csvTemplateHeaderFields }, 
      function(err, csv) {
        if (err) console.log(err);
        console.log(csv);
        // masterArray.push(csv)
        res.send(csv);
    });
  },
  helperFncReturnArrayTest: function(req, res) {
    // console.log("1CHAIN")
    var product = req.body
    // console.log("Product Returned:", testing(product))
    masterArray.push(testing(product) );







    
    console.log("masterArray", masterArray)
    res.send("hit")
  }
}

module.exports = jsonexportController