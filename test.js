// var json2csv = require('json2csv');
var merge = require('merge');
var csvTemplateHeaderFields = require('./csvTemplateHeaderFields')
var sizeWeight = require('./sizeWeight')
var colorAbrevs = require('./colorAbrevs')
var moment = require('moment');

  console.log("TESTIN from inside sandbox");

  // var masterProductCsvTemplate = [];


  var sizeNameAbreviation = {
    "Small": "sm",
    "Medium": "md",
    "Large": "lg",
    "XL": "xl",
    "2XL": "2xl",
    "3XL": "3xl"
  }
    // kids sizes
  var kidsSizeNameAbreviation = {
    "Small": "2",
    "Medium": "3",
    "Large": "4",
    "XL": "56"
  }
    // onesie
  var babySizeNameAbreviation = {
    "Small": "nb",
    "Medium": "6m",
    "Large": "12m",
    "XL": "18m",
    "2XL": "24m"
  }

  var product = {
    item: "Hoodie",
    // title: "",
    type: "Sweatshirt",
    colors: {"Heather Grey": true,
            "Ash": true,
            "Black": false},
    sizes: {"Small": false,
            "Medium": true,
            "Large": true,
            "XL": false,
            "2XL": false,
            "3XL": false},
    // brands: "American Apparel",
    tags: "tagsTest",
    price: 48,
    short: "hoodie",
    Vendor: "Tucker's Ts",
    handle: "tucker's Handle",
    title: "tucker's title"
  }
  
  var productAttributesDetailed;
  var productAttributesDefaults;

  var masterProductCsvTemplate = [];
  // csvTemplate renamed to sizeAbrevArray
  // var csvTemplate = []

  var colorSizeArray = [];
  var sizeAbrevArray = [];
  var sizeWeightArray = [];


function testing () {
    //  testing to get response back by returning this array

    console.log("ITEM", item)
    console.log("title", title)
    console.log("vendor", vendor)
    console.log("handle", handle)
    // these are set on DOM

    //  should merge these in to each obj
    var item = product.item
    var title = product.title + " " + product.item
    var vendor = product["Vendor"]
    var handle = product.handle + "-" + product.short
    // var yearMonthDay = moment().format("YYYY-MM-DD");
    var dateFormatted = moment().format("YYYY-MMDD");
    var defaultTags = product.item + "," + "design_" + product.handle + "," + dateFormatted + ",";
    var tags =  defaultTags + product.tags
    console.log("TAGS", tags)

    // add only to first row obj
    productAttributesDetailed = {
                  "Title": title,
                  "Body (HTML)": title,
                  "Vendor": vendor,
                  "Published": "FALSE",
                  "Type": product.type,
                  "Tags": tags,
                  "Option1 Name": "Color",
                  // "Option1 Value": "merge color",
                  "Option2 Name": "Size",
                  "Gift Card": "FALSE",
                  // "Option2 Value": "merge size",
                  // "Image Src":  imageSrc
                  }

    // defualt to merge each colorsize prod obj with
    // add to every obj
    productAttributesDefaults = {
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

    createColorSizeObj();
    return masterProductCsvTemplate;
}
    // console.log("PRODUCT", product)
    // console.log("ITEM", item)
    // console.log("title", title)
    // console.log("vendor", vendor)

    // console.log("REQ.PRODUCT", req.body)


    function createColorSizeObj () {
      console.log("hi from createColorSizeObj fnc", productAttributesDefaults);
      for (colorName in product.colors) { 
        var colorBoolean = product.colors[colorName]
        console.log("colorName", colorName, "colorBoolean", colorBoolean);
        // if color is true, iterate through sizes
        if (colorBoolean) {
          for (sizeName in product.sizes) {

            console.log("sizeName", sizeName)

            var sizeBoolean = product.sizes[sizeName]
            //if both are true, create obj and bind
            if(colorBoolean && sizeBoolean) {
              // name obj
              var colorSize = colorName + sizeName;
              colorSize = {
                // "Handle": handle,
                "Item": product.item,
                // this should be a color size abbrev
                "Option1 Value": colorName,
                "Option2 Value": sizeName,
                // "Variant SKU": sku,
                // "Image Src": prodUrl,
                // "Variant Image": prodUrl
                // "Variant Price": product.price
                // add dynamic
                // "Variant SKU": "sku",
                // "Variant Grams": "merge"
              }

              console.log("colorSize", colorSize)

              // need to append size abrevs instead of sizename

              var defaultsAndColorSize = merge(colorSize, productAttributesDefaults)
              colorSizeArray.push(defaultsAndColorSize)
              
              console.log("colorSizeArray:", colorSizeArray);
            }
          }
        }
      }
    abrevsSizeNames(colorSizeArray)
  }
    // createColorSizeObj();
// }

 // SIZE ABBREV FNC
  function abrevsSizeNames (array) {
    console.log("hi from abrevsSizeNames")

    for (var i = 0; i < colorSizeArray.length; i++) {

      // console.log("product in array", colorSizeArray[i])
      var product = colorSizeArray[i]

      // console.log("product.item", product.Item)
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
                  var sku = product.handle + "-" + colorAbrev + "-" + sizeAbrev
                  var prodUrl = "http://productuploader.com/product/uploader/" + handle + "-" + colorAbrev + ".jpg"
                  var imageSrc = "http://productuploader.com/product/uploader/" + handle + "-" + colorAbrev + ".jpg"
                  console.log ("Onesie SIZE ABRV", colorAbrev)
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
          // hack to work for one product, need to catch else's
        } else {
          for (abrevKey in sizeNameAbreviation) {
            if(product["Option2 Value"] === abrevKey) {
              var sizeAbrev = sizeNameAbreviation[abrevKey]
              for (colorKey in colorAbrevs) {
                if (product["Option1 Value"] === colorKey) {
                  colorAbrev = colorAbrevs[colorKey];

                  // console.log("ABBREVIATE", colorName, "AS", colorAbrev);
                  var sku = product.Handle + "-" + colorAbrev + "-" + sizeAbrev;
                  console.log("SKU", sku);
                  var prodUrl = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg"
                  var imageSrc = prodUrl;
                  var mergeImageSrcObj = {"Image Src": imageSrc,
                                          "Variant SKU": sku,
                                          "Variant Image": prodUrl
                                          }

                  // console.log("mergeImageSrcObj", mergeImageSrcObj)
                  // merge(productAttributesDefaults, mergeImageSrcObj)
                  // actually has to merge with each i in 
                  // for (var i; in sizeAbrevArray) {
                    var productAttributesDetailedImgSrc = merge(mergeImageSrcObj, colorSizeArray[i])                          
                    sizeAbrevArray.push(productAttributesDetailedImgSrc)
                  // }
                  // console.log("productattributes-obj:", productAttributesDetailedImgSrc)
                  // console.log ("SIZE ABRV array", sizeAbrevArray)
                } 
              }
            }
          }
        } 
      }
      // console.log("sizeAbrevArray", sizeAbrevArray)
      addSizeWeights(sizeAbrevArray);
  }

    // abrevsSizeNames(csvTemplate)

    function addSizeWeights (array) {
      console.log("hola from add addSizeWeights")

      for(var i = 0; i < array.length; i++) {

        console.log("array[i].Item", array[i]["Item"])

        for (var j = 0; j < sizeWeight.length; j++) { 
          // console.log("sizeWeight[j]", sizeWeight[j])
        if(array[i]["Item"] === sizeWeight[j]["item"] 
          && array[i]["Option2 Value"] === sizeWeight[j]["size"] ) {
            var sizeWeightObj = merge(array[i], sizeWeight[j])
            // console.log("colorSizeWight****", sizeWeightObj)
            sizeWeightArray.push(sizeWeightObj)
          }
        }
      }
      addFirstRowDetails(sizeWeightArray);
    }

  function addFirstRowDetails (array) {
        // 1. merge colorsizearray[0] w/ productAttributesDetailed then productAttributesDefaults    
    var firstRow = merge(sizeWeightArray[0], productAttributesDetailed);
    // holy fuck this works!
    // not if you want to push multiple prdocts tho
    sizeWeightArray[0] = firstRow;

    // console.log("csvTemplate", csvTemplate)
    console.log("firstRow", firstRow)
    // 2. merge colorsizearray[1++] w/ productAttributesDefaults
    // now you need to iterate through each product and add size weights 

    // console.log("TEMPLATE", csvTemplate)

    // now send each obj within local template to master template:
    for(var i=0; i < sizeWeightArray.length; i++) {
      masterProductCsvTemplate.push(sizeWeightArray[i])
    }
    
    // console.log("MASTER TEMPLATE", masterProductCsvTemplate)

    // return masterProductCsvTemplate

  }


/*
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

    // now send each obj within local template array to master template:
    for(var i=0; i <= csvTemplate.length - 1; i++) {
      masterProductCsvTemplate.push(csvTemplate[i])
    }


    // chainTest(masterProductCsvTemplate)
    // return masterProductCsvTemplate;
    // return chainTest()

}

// function chainTest () {
//   return masterProductCsvTemplate
// } 

*/

module.exports = testing;

//////////////////*********///////////////////
/*
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
*/