var Product = require('../models/products')
var json2csv = require('json2csv');
var merge = require('merge');
var testing = require("../test.js");
var moment = require('moment');
// moment().format();
// , original, cloned;

var csvTemplateHeaderFields = require('../csvTemplateHeaderFields')
var sizeWeight = require('../sizeWeight');
var colorAbrevs = require('../colorAbrevs');

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
    
    // var imageSrc;

    var product = req.body
    var item = req.body.item
    var title = req.body.title + " " + req.body.item
    var vendor = req.body["Vendor"]
    var handle = req.body.handle + "-" + req.body.short
    // var yearMonthDay = moment().format("YYYY-MM-DD");
    var dateFormatted = moment().format("YYYY-MMDD");
    var defaultTags = req.body.item + "," + "design_" + req.body.handle + "," + dateFormatted + ",";
    var tags = req.body.tags
    console.log("TAGS", tags)


    // console.log("PRODUCT", product)
    // console.log("ITEM", item)
    // console.log("title", title)
    // console.log("vendor", vendor)

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
                  "Tags": defaultTags + tags,
                  "Option1 Name": "Color",
                  // "Option1 Value": "merge color",
                  "Option2 Name": "Size",
                  "Gift Card": "FALSE",
                  // "Option2 Value": "merge size",
                  // "Image Src":  imageSrc
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
              // need to append size abrevs instead of sizename
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

              // SIZE ABBREV FNC

                // if Onesie or kidsT
              if (product.item === "Kid's Tee") {
                // key in size abbrev obj
                  for (abrevKey in kidsSizeNameAbreviation) {
                    // if sizes match, create sku
                    if(sizeName === abrevKey) {
                      var sizeAbrev = kidsSizeNameAbreviation[abrevKey]
                      for (colorKey in colorAbrevs) {
                        if (colorName === colorKey) {
                          colorAbrev = colorAbrevs[colorKey]
                          console.log("ABBREVIATE", colorName, "AS", colorAbrev)
                          var sku = handle + "-" + colorAbrev + "-" + sizeAbrev
                          var prodUrl = "http://productuploader.com/product/uploader/" + handle + "-" + colorAbrev + ".jpg"
                          var imageSrc = "http://productuploader.com/product/uploader/" + handle + "-" + colorAbrev + ".jpg"
                          // console.log ("Onesie SIZE ABRV", abrev)
                        } 
                        console.log ("KidsT SKU", sku)
                      }
                    }
                  }
                } else if (product.item === "Onesie") {
                  for (abrevKey in babySizeNameAbreviation) {
                    if(sizeName === abrevKey) {
                      // console.log("ONSIE SIZE", product.sizes)
                      var sizeAbrev = babySizeNameAbreviation[abrevKey]
                      // build sku with color abbrev
                      // if colorName === key in colorabreves)
                      // then replace colorname with colorabrev VALUE and add to sku
                      for (colorKey in colorAbrevs) {
                        if (colorName === colorKey) {
                          colorAbrev = colorAbrevs[colorKey]
                          console.log("ABBREVIATE", colorName, "AS", colorAbrev)
                          var sku = handle + "-" + colorAbrev + "-" + sizeAbrev
                          var prodUrl = "http://productuploader.com/product/uploader/" + handle + "-" + colorAbrev + ".jpg"
                          var imageSrc = "http://productuploader.com/product/uploader/" + handle + "-" + colorAbrev + ".jpg"
                          // console.log ("Onesie SIZE ABRV", abrev)
                        } 
                        // console.log ("Onesie SKU", sku)
                      }
                    }
                  }
                } else {
                  for (abrevKey in sizeNameAbreviation) {
                    if(sizeName === abrevKey) {
                      var sizeAbrev = sizeNameAbreviation[abrevKey]
                      for (colorKey in colorAbrevs) {
                        if (colorName === colorKey) {
                          colorAbrev = colorAbrevs[colorKey];
                          console.log("ABBREVIATE", colorName, "AS", colorAbrev);
                          var sku = handle + "-" + colorAbrev + "-" + sizeAbrev;
                          var prodUrl = "http://productuploader.com/product/uploader/" + handle + "-" + colorAbrev + ".jpg"
                          var imageSrc = prodUrl;
                          var mergeImageSrcObj = {"Image Src": imageSrc}
                          // merge(productAttributesDefaults, mergeImageSrcObj)
                          var productAttributesDetailedImgSrc = merge(mergeImageSrcObj, productAttributesDetailed)                          
                          console.log("productattributes-obj:", productAttributesDetailedImgSrc)
                          // console.log ("Onesie SIZE ABRV", abrev)
                        } 
                        // console.log ("Onesie SKU", sku)
                      }
                      // console.log("SSSSKKKKKUUUUUpuid", sku)
                    }
                  }
                // }
                }

              // add color and size attributes
              // *also add dynamic fields
              // merges with all
              console.log("SKU", sku)
              colorSize = {
                // "Handle": handle,
                "Item": item,
                // this should be a color size abbrev
                "Option1 Value": colorName,
                "Option2 Value": sizeName,
                "Variant SKU": sku,
                // "Image Src": prodUrl,
                "Variant Image": prodUrl
                // "Variant Price": product.price
                // add dynamic
                // "Variant SKU": "sku",
                // "Variant Grams": "merge"
              }
              console.log("ITEM working?", item)
              // merge size weights:
              // wait what? ok
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
              console.log("whats wrong? full template:", csvTemplate)
            }
          }
        }
      }

    // console.log("productattributes-obj:", productAttributesDetailed)
    // 1. merge colorsizearray[0] w/ productAttributesDetailed then productAttributesDefaults    
    var firstRow = merge(csvTemplate[0], productAttributesDetailedImgSrc);
    // holy fuck this works!
    // not if you want to push multiple prdocts tho
    csvTemplate[0] = firstRow;
    // console.log("csvTemplate", csvTemplate)
    // 2. merge colorsizearray[1++] w/ productAttributesDefaults
    // now you need to iterate through each product and add size weights 

    // console.log("TEMPLATE", csvTemplate)

    // now send each obj within local template to master template:
    for(var i=0; i <= csvTemplate.length - 1; i++) {
      masterProductCsvTemplate.push(csvTemplate[i])
    }
    console.log("MASTER TEMPLATE", masterProductCsvTemplate)
  },
  test: function (req, res) {
    // console.log(req)
    // res.send({testing: 123});
    // console.log("TEST REQ.BODY", colors)
    // res.send(testing());
    json2csv({ data: testing(), fields: csvTemplateHeaderFields }, 
      function(err, csv) {
        if (err) console.log(err);
        console.log(csv);
        res.send(csv);
    });
  },
  jest: function(req, res) {
    console.log("CHAIN")
  }
}

module.exports = jsonexportController