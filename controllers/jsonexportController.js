var Product = require('../models/products')
var json2csv = require('json2csv');
var merge = require('merge');
// , original, cloned;

var csvTemplateHeaderFields = require('../csvTemplateHeaderFields')

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
    var csvTemplate = []
    // console.log("REQ.PRODUCT", req.body.product)

    // these are set on DOM
    // added only to first row obj
     var productAttributesDetailed = {
                  // "Title": "req.body.title",
                  "Body (HTML)": "req.body.name",
                  "Vendor": "req.body.vendor",
                  "Published": "FALSE",
                  "Type": req.body.product.item,
                  "Tags": "req.body.tags",
                  "Option1 Name": "Color",
                  // "Option1 Value": "merge color",
                  "Option2 Name": "Size",
                  "Gift Card": "FALSE"
                  // "Option2 Value": "merge size",
                  }

    // defualt to merge each colorsize prod obj with
    // added to every obj
    var productAttributesDefaults = {
                  // "Published": "False",
                  // "Option1 Name": "Color",
                  // "Option2 Name": "Size",
                  "Variant Inventory Qty": 1,
                  "Variant Inventory Policy": "deny",
                  "Variant Fulfillment Service": "manual",
                  "Variant Requires Shipping": "TRUE",
                  "Variant Taxable": "TRUE",
                  "Variant Weight Unit": "oz"
                  }

    var sizeWeight = [{"item": "Crewneck", 
                      "size": "small",
                      "Variant Grams": 350}, 
                      {"item": "Crewneck", 
                      "size": "medium",
                      "Variant Grams": 360}, 
                      {"item": "Crewneck", 
                      "size": "large",
                      "Variant Grams": 570}]

    var product = req.body.product
    var item = req.body.product.item

    // function createColorSizeObj () {
      for (colorName in product.colors) {
        var colorBoolean = product.colors[colorName]
        // if color is true, iterate through sizes
        if (colorBoolean) {
          for (sizeName in product.sizes) {
            var sizeBoolean = product.sizes[sizeName]
            //if both are true, create obj and bind
            if(colorBoolean && sizeBoolean) {
              // name obj
              var colorSize = colorName + sizeName;
              // add color and size attributes
              // *also add dynamic fields
              colorSize = {
                "Handle": item,
                "Option1 Value": colorName,
                "Option2 Value": sizeName,
                "Variant Price": product.price
                // add dynamic
                // "Variant SKU": "sku",
                // "Variant Grams": "merge"
              }
              // merge size weights:
                for(var i = 0; i< sizeWeight.length; i++) {
                  if(colorSize["Handle"] === sizeWeight[i]["item"] 
                    && colorSize["Option2 Value"] === sizeWeight[i]["size"] ) {
                      var colorSizeWight = merge(colorSize, sizeWeight[i])
                    console.log("colorSizeWight****", colorSizeWight)
                }
              }
              var fullProd = merge(colorSize, productAttributesDefaults)
              // console.log("FULLPRODSIZE:", fullProd["Option2 Value"])
              // push to global array instead of my data
              // then on save + export csv button click, download full array of prod objs
              csvTemplate.push(fullProd)
            }
          }
        }
      }

    // 1. merge colorsizearray[0] w/ productAttributesDetailed then productAttributesDefaults    
    var firstRow = merge(csvTemplate[0], productAttributesDetailed);
    // holy fuck this works!
    csvTemplate[0] = firstRow;
    console.log("csvTemplate", csvTemplate)
    // 2. merge colorsizearray[1++] w/ productAttributesDefaults
    // now you need to iterate through each product and add size weights 

    // console.log("TEMPLATE", csvTemplate)
    
    json2csv({ data: csvTemplate, fields: csvTemplateHeaderFields }, function(err, csv) {
      if (err) console.log(err);
      // send back to front end for download
      res.send(csv)
    });
  }
}

module.exports = jsonexportController