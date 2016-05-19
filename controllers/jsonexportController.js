var Product = require('../models/products')
var json2csv = require('json2csv');
var merge = require('merge');
var testing = require("../converterHelperFunctions.js");
var moment = require('moment');
var request = require('request');

var csvTemplateHeaderFields = require('../csvTemplateHeaderFields')
var sizeWeight = require('../sizeWeight');
var colorAbrevs = require('../colorAbrevs');

var createLocalProductArray = require('../uploadHelperFunctions.js')
var apiUrl = "https://9852e9327df153b6303e9d74c09077b4:78f1c269ac2e9642240f588bec8548fd@printing-site.myshopify.com/admin/products.json"

var masterProductCsvTemplate = [];
var masterArray = []

jsonexportController = {
  convertJson: function (req, res) {
    // flatten array
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
  generateProductObj: function(req, res) {
    // console.log("1CHAIN")
    var product = req.body
    // console.log("Product Returned:", testing(product))
    masterArray.push(testing(product) );
    console.log("masterArray", masterArray)
    res.send("hit")
  },
  testHelperFnc: function (req, res) {
    console.log("test controller");
    res.send(createLocalProductArray(masterArray));
  },
  postProduct: function (req, res) {
    console.log("POST REQ FNC HIT!");
    // for(i=0; i <= masterArray.length; i++) { 
      // var shopfiyProduct = createLocalProductArray(masterArray[i]);
      var shopfiyProduct = createLocalProductArray(masterArray);
      res.send(JSON.stringify(shopfiyProduct));
      request({
        url: apiUrl, //URL to hit
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shopfiyProduct) //stringify the body product obj
      }, function(error, response, body){
          if(error) {
              console.log(error);
          } else {
            console.log(response.statusCode, body);
            res.send(response)
          }
      });
    // }
  },
  getAllProducts: function (req, res) {
      request({
      url: apiUrl, //URL to hit
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            console.log("response:", response, "BODY", body);
            res.send(response)
        }
    });
  }
}

module.exports = jsonexportController