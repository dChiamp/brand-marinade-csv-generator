var Product = require('../models/products')
var json2csv = require('json2csv');
var merge = require('merge');
var testing = require("../test.js");
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
    var title = req.body.title + " " + req.body.item
    var vendor = req.body["Vendor"]
    var handle = req.body.handle + "-" + req.body.short
    // var sku = handle + "-" + product.color

    // console.log("PRODUCT", product)
    // console.log("ITEM", item)
    // console.log("title", title)
    // console.log("vendor", vendor)
    // console.log("handle", handle)

    var csvTemplate = []
    // console.log("REQ.PRODUCT", req.body)

    // these are set on DOM
    // add only to first row obj
     var productAttributesDetailed = {
                  "Title": title,
                  "Body (HTML)": title,
                  "Vendor": vendor,
                  "Published": "FALSE",
                  "Type": req.body.type,
                  "Tags": req.body.tags,
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
                  "Handle": handle,
                  "Variant Price": product.price,
                  "Variant Inventory Qty": 1,
                  "Variant Inventory Policy": "deny",
                  "Variant Fulfillment Service": "manual",
                  "Variant Requires Shipping": "TRUE",
                  "Variant Taxable": "TRUE",
                  "Variant Weight Unit": "oz"
                  }

    var sizeWeight = [
                      {"item": "Crewneck", 
                      "size": "Small",
                      "Variant Grams": 340}, 
                      {"item": "Crewneck", 
                      "size": "Medium",
                      "Variant Grams": 369}, 
                      {"item": "Crewneck", 
                      "size": "Large",
                      "Variant Grams": 397},
                      {"item": "Crewneck", 
                      "size": "XL",
                      "Variant Grams": 397},
                      {"item": "Crewneck", 
                      "size": "2XL",
                      "Variant Grams": 425},
                      {"item": "Crewneck", 
                      "size": "3XL",
                      "Variant Grams": 454},

                      {"item": "Hoodie", 
                      "size": "Small",
                      "Variant Grams": 340}, 
                      {"item": "Hoodie", 
                      "size": "Medium",
                      "Variant Grams": 369}, 
                      {"item": "Hoodie", 
                      "size": "Large",
                      "Variant Grams": 397},
                      {"item": "Hoodie", 
                      "size": "XL",
                      "Variant Grams": 397},
                      {"item": "Hoodie", 
                      "size": "2XL",
                      "Variant Grams": 425},
                      {"item": "Hoodie", 
                      "size": "3XL",
                      "Variant Grams": 454},

                      {"item": "Kid's Tee", 
                      "size": "Small",
                      "Variant Grams": 350}, 
                      {"item": "Kid's Tee", 
                      "size": "Medium",
                      "Variant Grams": 360}, 
                      {"item": "Kid's Tee", 
                      "size": "Large",
                      "Variant Grams": 570},
                      {"item": "Kid's Tee", 
                      "size": "XL",
                      "Variant Grams": 570},
                      {"item": "Kid's Tee", 
                      "size": "2XL",
                      "Variant Grams": 570},

                      {"item": "Onesie", 
                      "size": "Small",
                      "Variant Grams": 350}, 
                      {"item": "Onesie", 
                      "size": "Medium",
                      "Variant Grams": 360}, 
                      {"item": "Onesie", 
                      "size": "Large",
                      "Variant Grams": 570},
                      {"item": "Onesie", 
                      "size": "XL",
                      "Variant Grams": 570},
                      {"item": "Onesie", 
                      "size": "2XL",
                      "Variant Grams": 570},


                      {"item": "Tank Top", 
                      "size": "Small",
                      "Variant Grams": 113}, 
                      {"item": "Tank Top", 
                      "size": "Medium",
                      "Variant Grams": 142}, 
                      {"item": "Tank Top", 
                      "size": "Large",
                      "Variant Grams": 142},
                      {"item": "Tank Top", 
                      "size": "XL",
                      "Variant Grams": 170},
                      {"item": "Tank Top", 
                      "size": "2XL",
                      "Variant Grams": 198},

                      {"item": "Men's Tee", 
                      "size": "Small",
                      "Variant Grams": 142}, 
                      {"item": "Men's Tee", 
                      "size": "Medium",
                      "Variant Grams": 170}, 
                      {"item": "Men's Tee", 
                      "size": "Large",
                      "Variant Grams": 170},
                      {"item": "Men's Tee", 
                      "size": "XL",
                      "Variant Grams": 198},
                      {"item": "Men's Tee", 
                      "size": "2XL",
                      "Variant Grams": 227},
                      {"item": "Men's Tee", 
                      "size": "3XL",
                      "Variant Grams": 255},

                      {"item": "Men's V", 
                      "size": "Small",
                      "Variant Grams": 142}, 
                      {"item": "Men's V", 
                      "size": "Medium",
                      "Variant Grams": 170}, 
                      {"item": "Men's V", 
                      "size": "Large",
                      "Variant Grams": 170},
                      {"item": "Men's V", 
                      "size": "XL",
                      "Variant Grams": 198},
                      {"item": "Men's V", 
                      "size": "2XL",
                      "Variant Grams": 227},
                      {"item": "Men's V", 
                      "size": "3XL",
                      "Variant Grams": 255},

                      {"item": "Women's V", 
                      "size": "Small",
                      "Variant Grams": 113}, 
                      {"item": "Women's V", 
                      "size": "Medium",
                      "Variant Grams": 142}, 
                      {"item": "Women's V", 
                      "size": "Large",
                      "Variant Grams": 142},
                      {"item": "Women's V", 
                      "size": "XL",
                      "Variant Grams": 170},
                      {"item": "Women's V", 
                      "size": "2XL",
                      "Variant Grams": 198}
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
              // need to append stupid ass abrevs instread of sizenam
              var sizeNameAbreviation = {
                "Small": "sm",
                "Medium": "md",
                "Large": "lg",
                "XL": "xl",
                "2XL": "2xl",
                "3XL": "3xl"}
                // kids sizes
              var kidsSizeNameAbreviation = {
                "Small": "2",
                "Medium": "3",
                "Large": "4",
                "XL": "56"}
                // onesie
              var babySizeNameAbreviation = {
                "Small": "nb",
                "Medium": "6m",
                "Large": "12m",
                "XL": "18m",
                "2XL": "24m"
              }

              // console.log("PRODUCT ITEM IN FNC:", product.item);

              // BIND SIZE ABBREV FNC
                // if Onesie or kidsT
              if (product.item === "Kid's Tee") {
                // key in size abbrev obj
                  for (abrevKey in kidsSizeNameAbreviation) {
                    // if sizes match, create sku
                    if(sizeName === abrevKey) {
                      var abrev = kidsSizeNameAbreviation[abrevKey]
                      var sku = handle + "-" + colorName.toLowerCase() + "-" + abrev
                      var prodUrl = "http://productuploader.com/product/uploader/" + handle + "-" + colorName + ".jpg"
                      console.log ("KIDS SIZE ABRV", abrev)
                    }
                  }
                } else if (product.item === "Onesie") {
                  for (abrevKey in babySizeNameAbreviation) {
                    if(sizeName === abrevKey) {
                      console.log("ONSIE SIZE", product.sizes)
                      var abrev = babySizeNameAbreviation[abrevKey]
                      var sku = handle + "-" + colorName.toLowerCase() + "-" + abrev
                      var prodUrl = "http://productuploader.com/product/uploader/" + handle + "-" + colorName + ".jpg"
                      console.log ("Onesie SIZE ABRV", abrev)
                    }
                  }
                } else {
                  for (abrevKey in sizeNameAbreviation) {
                    if(sizeName === abrevKey) {
                      var sku = handle + "-" + colorName.toLowerCase() + "-" + sizeNameAbreviation[abrevKey]
                      var prodUrl = "http://productuploader.com/product/uploader/" + handle + "-" + colorName + ".jpg"
                      // console.log("SSSSKKKKKUUUUUpuid", sku)
                    }
                  }
                // }
                }

              // add color and size attributes
              // *also add dynamic fields
              console.log("SKU", sku)
              colorSize = {
                // "Handle": handle,
                "Item": item,
                // this should be a color size abbrev
                "Option1 Value": colorName,
                "Option2 Value": sizeName,
                "Variant SKU": sku,
                "Image Src": prodUrl,
                "Variant Image": prodUrl
                // "Variant Price": product.price
                // add dynamic
                // "Variant SKU": "sku",
                // "Variant Grams": "merge"
              }
              // merge size weights:
                for(var i = 0; i< sizeWeight.length; i++) {
                  if(colorSize["Item"] === sizeWeight[i]["item"] 
                    && colorSize["Option2 Value"] === sizeWeight[i]["size"] ) {
                      var colorSizeWeight = merge(colorSize, sizeWeight[i])
                      // console.log("colorSizeWight****", colorSizeWeight)
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
  },
  test: function (req, res) {
    var colors = {red: true}
    // console.log("TEST REQ.BODY", colors)
    testing();
  },
  jest: function(req, res) {
    console.log("CHAIN")
  }
}

module.exports = jsonexportController