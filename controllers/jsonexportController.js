var Product = require('../models/products')
var jsonexport = require('jsonexport')

var json2csv = require('json2csv');

var csvTemplateFields = [
                "Handle", 
                "Title",
                "Body(HTML)",
                "Vendor",
                "Type",
                "Tags",
                "Published",
                "Option1 Name",
                "Option1 Value",
                "Option2 Name",
                "Option2 Value"
                ]

jsonexportController = {
  convertJson: function (req, res) {
    // test get req
    var mydata = [{
                    "Handle": sku, 
                    "Title": title,
                    "Body (HTML)": body + title,
                    "Vendor": vendor,
                    "Type": type,
                    "Tags": tags,
                    "Published": "False",
                    "Option1 Name": "Color",
                    "Option1 Value": color,
                    "Option2 Name": "Size",
                    "Option2 Value": size
                    }]

    console.log("MY DATA:", myCars, "FIELDS: ", csvTemplateFields)
    json2csv({ data: myCars, fields: csvTemplateFields }, function(err, csv) {
      if (err) console.log(err);
      console.log(csv);
      res.send(csv);
    });
  },
  updateProduct: function (req, res) {
    // get product from DOM
    var myData = req.body.data;
    // convert to csv
    // console.log("MY DATA:", myCars, "FIELDS:", fields)
    json2csv({ data: myData, fields: csvTemplateFields }, function(err, csv) {
      if (err) console.log(err);
      // send back to front end for download
      // console.log(csv);
      res.send(csv)
    });
  }
}

module.exports = jsonexportController