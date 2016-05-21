var Product = require('../models/products')
var json2csv = require('json2csv');
var merge = require('merge');
var moment = require('moment');
var request = require('request');
// api keys
var printingSiteApiEndpt = process.env.PRINTING_SITE + "/admin/products.json"
var stonedMgApiEndpt = process.env.STONED_MG + "/admin/products.json"
// helper functions
var testing = require("../converterHelperFunctions.js");
var createLocalProductArray = require('../uploadHelperFunctions.js')
// required objects
var csvTemplateHeaderFields = require('../csvTemplateHeaderFields')
var sizeWeight = require('../sizeWeight');
var colorAbrevs = require('../colorAbrevs');
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
        // clear them out
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
  postPrintProduct: function (req, res) {
    for(var i=0; i < masterArray.length; i++) { 
      console.log("POST REQ FNC HIT!");
      var shopfiyProduct = createLocalProductArray(masterArray[i]);
      // var shopfiyProduct = createLocalProductArray(masterArray);
      console.log("SHOPFIFY PRODUCT:", JSON.stringify(shopfiyProduct))
      request({
        url: printingSiteApiEndpt, //URL to hit
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shopfiyProduct) //stringify the body product obj
      }, function(error, response, body){
          if(error) {
              console.log(error);
          } else {
            console.log("response", response);
          }
      });
    }
      // what should i send as response???
      res.send()
  },
  getPrintProducts: function (req, res) {
      request({
      url: printingSiteApiEndpt, //URL to hit
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
  },
  postStonedProduct: function (req, res) {
    console.log("Stoned post")
    for(var i=0; i < masterArray.length; i++) { 
      var shopfiyProduct = createLocalProductArray(masterArray[i]);
      console.log("SHOPFIFY PRODUCT:", JSON.stringify(shopfiyProduct))
      request({
        url: stonedMgApiEndpt, //URL to hit
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shopfiyProduct) //stringify the body product obj
      }, function(error, response, body){
          if(error) {
              console.log("ERROR:", error);
          } else {
              // console.log("response:", response, "BODY", body);
            console.log("response:", response);
          }
      });
    }
    res.send()
  },
  getStonedProducts: function (req, res) {
    console.log("Stoned post")
    request({
      url: stonedMgApiEndpt, //URL to hit
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