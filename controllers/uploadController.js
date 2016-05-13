var json2csv = require('json2csv');
var merge = require('merge');
var testing = require("../converterHelperFunctions.js");
var moment = require('moment');
var request = require('request');

var apiPostUrl = "https://9852e9327df153b6303e9d74c09077b4:78f1c269ac2e9642240f588bec8548fd@printing-site.myshopify.com/admin/products.json"
var testProductPost = {
                      "product": {
                        "title": "test1",
                        "body_html": "<strong>Good test!<\/strong>",
                        "vendor": "biz3",
                        "product_type": "thrashplank",
                        "published": false
                      }
                    }

uploadController = {
  postProduct: function (req, res) {
        request({
        url: apiPostUrl, //URL to hit
        // qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Custom-Header': 'Custom Value'
        },
        body: testProductPost //Set the body product obj
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
        }
    });
  },
  getAllProducts: function (req, res) {
        request({
        url: apiPostUrl, //URL to hit
        // qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Custom-Header': 'Custom Value'
        },
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            // console.log(response.statusCode, body);
            console.log("response:", response, "BODY", body);
            res.send(response)
        }
    });
  }
}

module.exports = uploadController