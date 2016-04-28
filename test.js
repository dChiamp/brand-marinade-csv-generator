// var json2csv = require('json2csv');
var merge = require('merge');
// var csvTemplateHeaderFields = require('./csvTemplateHeaderFields')

function testing () {
  console.log("TESTIN 123");

  var masterProductCsvTemplate = [];



 // get product from DOM
    // var myData = req.body.data;

    var product = {
                    item: "Hoodie",
                    // title: "",
                    colors: {Heather: true,
                            Ash: true,
                            Black: false},
                    sizes: {small: true,
                            medium: false,
                            large: false },
                    // brands: "American Apparel",
                    tags: ["hella cool"],
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20,
                    short: "hoodie",
                    Vendor: "tucker's Tees",
                    handle: "tuk-sux"
                  }


    console.log("PRODUCT", product)

    var item = product.item
    var title = product.title + " " + product.item
    var vendor = product["Vendor"]
    var handle = product.handle + "-" + product.short
    // var sku = handle + "-" + product.color

    console.log("ITEM", item)
    console.log("title", title)
    console.log("vendor", vendor)
    console.log("handle", handle)

    var csvTemplate = []
    // console.log("REQ.PRODUCT", req.body)

    // these are set on DOM
    // add only to first row obj
     var productAttributesDetailed = {
                  "Title": title,
                  "Body (HTML)": title,
                  "Vendor": vendor,
                  "Published": "FALSE",
                  "Type": item,
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
              // need to append stupid ass abrevs instread of sizenam
              var sizeNameAbreviation = {
                small: "sm",
                medium: "md",
                large: "lg"
              }

              for (abrevKey in sizeNameAbreviation) {
                if (sizeName == abrevKey) {
                  var sku = handle + "-" + colorName + "-" + sizeNameAbreviation[abrevKey]
                  var prodUrl = "http://productuploader.com/product/uploader/" + handle + "-" + colorName + ".jpg"
                  console.log("SSSSKKKKKUUUUUpuid", sku)
                }
              }
              // add color and size attributes
              // *also add dynamic fields
              colorSize = {
                // "Handle": handle,
                "Item": item,
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

    console.log("csvTemplate", csvTemplate)
    // 2. merge colorsizearray[1++] w/ productAttributesDefaults
    // now you need to iterate through each product and add size weights 

    // console.log("TEMPLATE", csvTemplate)

    // now send each obj within local template to master template:
    for(var i=0; i <= csvTemplate.length; i++) {
      masterProductCsvTemplate.push(csvTemplate[i])
    }
    
    console.log("MASTER TEMPLATE", masterProductCsvTemplate)
}
module.exports = testing