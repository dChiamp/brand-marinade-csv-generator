var Product = require('../models/products')
var json2csv = require('json2csv');
var merge = require('merge'), original, cloned;

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
    // console.log("REQ.PRODUCT", req.body.product)
    // console.log("CSV TEST DATA DRILL:", req.body.testData["Handle"]);
    // console.log("CSV TEST DATA:", req.body.testData);
    // console.log("NEW PRODUCT ARRAY:", newProduct)


    var csvTemplate = []

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
                  "Option1 Value": "merge color",
                  "Option2 Name": "Size",
                  "Option2 Value": "merge size",
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
                  "Gift Card": "FALSE",
                  "Variant Weight Unit": "oz"
                  }


    var product = req.body.product
    var item = req.body.product.item
    var colorSizeArr = []

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
              // console.log("COLORSiZE", colorSize)
              // add color and size attributes
              // colorSize.color = colorName;
              // colorSize.size = sizeName;

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

              var fullProd = merge(colorSize, productAttributesDefaults)
              
              // console.log("FUll PRODCUT OBJ", fullProd)
              // push to global array instead of my data
              // then on save + export csv button click, download full array of prod objs
              colorSizeArr.push(fullProd)

              csvTemplate.push(fullProd)
          

            }
            
          }
        }
      }
    // };

    // 1. merge colorsizearray[0] w/ productAttributesDetailed then productAttributesDefaults
    // colorSizeArr[0] 
    
    // for 
    var firstRow = merge(colorSizeArr[0], productAttributesDetailed);
    // holy fuck this works!
    colorSizeArr[0] = firstRow;
    // console.log("FIRST ROW", firstRow)
    // csvTemplate.push(firstRow)
    console.log("colorSizeArr", colorSizeArr)



    // 2. merge colorsizearray[1++] w/ productAttributesDefaults

    // now you need to iterate through each product and add size weights 


    // createColorSizeObj();

      // maybe it iterates through here
      // initialize array
      // var newProduct = [];
      // newProduct.push(req.body.testData);
      // you can push each attr individualy or grouped in obj

      // getting data from each updated product 
      var myTestData2 = {
                    "Handle": req.body.testData["Handle"],
                    "Item": req.body.item,
                    "Price": req.body.price,
                    "Tags": req.body.tags
                    };
      
      // add in default full attr before pushing
      // figure out how to merge them in so you can map weight to size and merge t

      // push that to full csv 
      // myTestData.push(myTestData2);

      // console.log("FULL PRODUCT:", myTestData)

    // convert to csv
    // console.log("TEMPLATE", csvTemplate)
    
    json2csv({ data: csvTemplate, fields: csvTemplateHeaderFields }, function(err, csv) {
      if (err) console.log(err);
      // send back to front end for download
      res.send(csv)
    });
  }
}

module.exports = jsonexportController