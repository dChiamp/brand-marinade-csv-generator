var Product = require('../models/products')
var json2csv = require('json2csv');
var merge = require('merge');
// , original, cloned;

var csvTemplateHeaderFields = require('../csvTemplateHeaderFields')
var masterProductCsvTemplate = [];

jsonexportController = {
  convertJson: function (req, res) {
    console.log("totalCSV:", masterProductCsvTemplate)
    json2csv({ data: masterProductCsvTemplate, fields: csvTemplateHeaderFields }, 
      function(err, csv) {
        if (err) console.log(err);
        console.log(csv);
        res.send(csv);
    });
  },
  updateProduct: function (req, res) {
    // get product from DOM
    // var myData = req.body.data;

    var product = req.body
    var item = req.body.item
    var title = req.body.title

    console.log("PRODUCT colors", product.colors)
    console.log("ITEM", item)

    var csvTemplate = []
    console.log("REQ.PRODUCT", req.body)

    // these are set on DOM
    // add only to first row obj
     var productAttributesDetailed = {
                  // "Title": title,
                  "Body (HTML)": "req.body.name",
                  "Vendor": "req.body.vendor",
                  "Published": "FALSE",
                  "Type": req.body.item,
                  "Tags": "req.body.tags",
                  "Option1 Name": "Color",
                  // "Option1 Value": "merge color",
                  "Option2 Name": "Size",
                  "Gift Card": "FALSE"
                  // "Option2 Value": "merge size",
                  }

    // defualt to merge each colorsize prod obj with
    // add to every obj
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

    var sizeWeight = [
                      {"item": "Crewneck", 
                      "size": "small",
                      "Variant Grams": 350}, 
                      {"item": "Crewneck", 
                      "size": "medium",
                      "Variant Grams": 360}, 
                      {"item": "Crewneck", 
                      "size": "large",
                      "Variant Grams": 570},

                      {"item": "Hoodie", 
                      "size": "small",
                      "Variant Grams": 350}, 
                      {"item": "Hoodie", 
                      "size": "medium",
                      "Variant Grams": 360}, 
                      {"item": "Hoodie", 
                      "size": "large",
                      "Variant Grams": 570}

                      ]

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
                "Title": title,
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
                      var colorSizeWeight = merge(colorSize, sizeWeight[i])
                      console.log("colorSizeWight****", colorSizeWeight)
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
    // not if you want to push multiple prdocts tho
    csvTemplate[0] = firstRow;
    // console.log("csvTemplate", csvTemplate)
    // 2. merge colorsizearray[1++] w/ productAttributesDefaults
    // now you need to iterate through each product and add size weights 

    // console.log("TEMPLATE", csvTemplate)

    // now send each obj within local template to master template:
    for(var i=0; i <= csvTemplate.length; i++) {
      masterProductCsvTemplate.push(csvTemplate[i])
    }
    
    // console.log("MASTER TEMPLATE", masterProductCsvTemplate)
  }
}

module.exports = jsonexportController