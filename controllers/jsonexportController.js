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
    var myData = [{
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

    console.log("MY DATA:", mydata, "FIELDS: ", csvTemplateFields)
    json2csv({ data: myData, fields: csvTemplateFields }, function(err, csv) {
      if (err) console.log(err);
      console.log(csv);
      res.send(csv);
    });
  },
  updateProduct: function (req, res) {
    // get product from DOM
    var myData = req.body.data;

     var myTestData = [{
                  "Handle": "sku", 
                  "Title": "title",
                  "Body (HTML)": "body",
                  "Vendor": "vendor",
                  "Type": "type",
                  "Tags": "tags",
                  "Published": "False",
                  "Option1 Name": "Color",
                  "Option1 Value": "color",
                  "Option2 Name": "Size",
                  "Option2 Value": "size"
                  }]

    // maybe it iterates through here
      // initialize array
      // var newProduct = [];
      // newProduct.push(req.body.testData);
      // you can push each attr individualy or grouped in obj

      console.log("CSV TEST DATA DRILL:", req.body.testData["Handle"]);
      console.log("CSV TEST DATA:", req.body.testData);
      // console.log("NEW PRODUCT ARRAY:", newProduct)

      // add in default full attr before pushing
      // figure out how to merge them in so you can map weight to size and merge t

      // getting data from each updated product 
      var myTestData2 = {
                    "Handle": req.body.testData["Handle"],
                    "Item": req.body.item,
                    "Price": req.body.price,
                    "Tags": req.body.tags
                    };

      // push that to full csv 
      myTestData.push(myTestData2);

      console.log("FULL PRODUCT:", myTestData)

    // convert to csv
    json2csv({ data: myTestData, fields: csvTemplateFields }, function(err, csv) {
      if (err) console.log(err);
      // send back to front end for download
      res.send(csv)
    });
  }
}

module.exports = jsonexportController