// var json2csv = require('json2csv');
var merge = require('merge');
var csvTemplateHeaderFields = require('./csvTemplateHeaderFields')
var sizeWeight = require('./sizeWeight')
var colorAbrevs = require('./colorAbrevs')
var moment = require('moment');

console.log("TESTIN from inside sandbox");

// objs to convert size abreviations
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
  "Size 2": "2",
  "Size 3": "3",
  "Size 4": "4",
  "Size 5/6": "56"
}
  // onesie
var babySizeNameAbreviation = {
  "Newborn": "nb",
  // "Medium": "nb",
  "6M": "6m",
  "12M": "12m",
  "18M": "18m",
  "24M": "24m"
}

var toteSizeNameAbreviation = {
  "One-size": "os"
}

var posterSizeNameAbreviation = {
  "Small": "sm",
  "Medium": "md",
  "Large": "lg"
}

var mugSizeNameAbreviation = {
  "12oz": "12oz",
  "160z": "16oz"
}

// initialize product vars
var product = {};

var productAttributesDetailed;
var productAttributesDefaults;

var masterProductCsvTemplate = [];
var colorSizeArray = [];
var sizeAbrevArray = [];
var sizeWeightArray = [];


// create first row of csv product obj
function testing (product) {
  // clear out templates b/t calls
  masterProductCsvTemplate = [];
  colorSizeArray = [];
  sizeAbrevArray = [];
  sizeWeightArray = [];

  // these are set on DOM
  //  should merge these in to each obj
  var item = product.item
  var title = product.title + " " + product.item
  var vendor = product["Vendor"]
  var handle = product.handle + "-" + product.short
  var dateFormatted = moment().format("YYYY-MMDD");
  var defaultTags = product.item + "," + "design_" + product.handle + "," + dateFormatted + ",";
  var tags =  defaultTags + product.tags + "," + product.productTags
  // add freeish tag
  if (product.freeish) {  tags += 'freeish' }
  
  var primaryImgColor = product.primaryImgColor
  // format published for csv
  var published = product.Published.toString().toUpperCase();

  // add only to first row obj
  productAttributesDetailed = {
                "Title": title,
                "Body (HTML)": title,
                "Vendor": vendor,
                "Published": published,
                "Type": product.type,
                "Tags": tags,
                "Option1 Name": "Color",
                // "Option1 Value": "merge color",
                "Option2 Name": "Size",
                "Gift Card": "FALSE"
                }

  console.log("TAGS", productAttributesDetailed.Tags)

  // defualt to merge each colorsize prod obj with
  // add to every obj

  //** add freeish boolean here 
  productAttributesDefaults = {
                // "Published": "False",
                // "Option1 Name": "Color",
                // "Option2 Name": "Size",
                "Handle": handle,
                // gotta UNfilter currency 
                "Variant Price": product.price,
                "Variant Inventory Qty": 1,
                "Variant Inventory Policy": "deny",
                "Variant Fulfillment Service": "manual",
                "Variant Requires Shipping": "TRUE",
                "Variant Taxable": "TRUE",
                "Variant Weight Unit": "oz",
                "defaultImgColor":  primaryImgColor,
                "freeish": product.freeish
                }

  return createColorSizeObj(product);
}

  function createColorSizeObj (product) {
      // colorSizeArray = [];
      // console.log("hi from createColorSizeObj fnc", productAttributesDefaults);
      for (colorName in product.colors) { 
        var colorBoolean = product.colors[colorName]
        console.log("colorName", colorName, "colorBoolean", colorBoolean);
        // if color is true, iterate through sizes
        if (colorBoolean) {
          for (sizeName in product.sizes) {
            // console.log("sizeName", sizeName)
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
              }

              // console.log("colorSize", colorSize)
              // need to append size abrevs instead of sizename
              var defaultsAndColorSize = merge(colorSize, productAttributesDefaults)
              colorSizeArray.push(defaultsAndColorSize)
              // console.log("colorSizeArray:", colorSizeArray);
            }
          }
        }
      }
    return abrevsSizeNames(colorSizeArray)
  }
    // createColorSizeObj();
// }

// SIZE ABBREV FNC
// also adds  color abbrevs
// bc both are in sku
function abrevsSizeNames (array) {
  // sizeAbrevArray = [];
  console.log("hi from abrevsSizeNames")

  // iterate thru all objs in colorsizearr
  for (var i = 0; i < colorSizeArray.length; i++) {

    var product = colorSizeArray[i]
    console.log("product Defualt Color", colorSizeArray[i].defaultImgColor)

    // console.log("product.item", product.Item)
    // if Onesie or kidsT
    if (product.Item === "Kid's Tee") {
      // key in size abbrev obj
        for (abrevKey in kidsSizeNameAbreviation) {
          // if sizes match, create sku
          // console.log("sizeName**", sizeName)
          // console.log("product COLOR",product["Option2 Value"])
          if(product["Option2 Value"] === abrevKey) {
            var sizeAbrev = kidsSizeNameAbreviation[abrevKey]
            for (colorKey in colorAbrevs) {
              if (product["Option1 Value"] === colorKey) {
                colorAbrev = colorAbrevs[colorKey];

                console.log("SIZE ABBREV:", sizeAbrev)
                // console.log("ABBREVIATE", colorName, "AS", colorAbrev);
                var sku = product.Handle + "-" + colorAbrev + "-" + sizeAbrev;
                // console.log("SKU", sku);
                var prodUrl = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg"
                var imageSrc = prodUrl;
              } 
                      // generate defualt color Img Src
              if (product.defaultImgColor === colorKey ) {
                // then create image src
                var defaultImgSrc = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg";
              }
              console.log ("KidsT SKU", sku)
            }
          }
        }
      } else if (product.Item === "Tote Bag") {
        for (abrevKey in toteSizeNameAbreviation) {
          if(product["Option2 Value"] === abrevKey) {
            // console.log("ONSIE SIZE", product.sizes)
            var sizeAbrev = toteSizeNameAbreviation[abrevKey]
            // build sku with color abbrev
            // if colorName === key in colorabreves)
            // then replace colorname with colorabrev VALUE and add to sku
            for (colorKey in colorAbrevs) {
                if (product["Option1 Value"] === colorKey) {
                colorAbrev = colorAbrevs[colorKey];
                // console.log("ABBREVIATE", colorName, "AS", colorAbrev);
                var sku = product.Handle + "-" + colorAbrev + "-" + sizeAbrev;
                console.log("SKU", sku);
                var prodUrl = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg"
                var imageSrc = prodUrl;
              } 
              // generate defualt color Img Src
              if (product.defaultImgColor === colorKey ) {
                // then create image src
                var defaultImgSrc = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg";
              }
              console.log ("Onesie SKU", sku)
            }
          }
        }
        // hack to work for one product, need to catch else's
      } else if (product.Item === "Onesie") {
        for (abrevKey in babySizeNameAbreviation) {
          if(product["Option2 Value"] === abrevKey) {
            // console.log("ONSIE SIZE", product.sizes)
            var sizeAbrev = babySizeNameAbreviation[abrevKey]
            // build sku with color abbrev
            // if colorName === key in colorabreves)
            // then replace colorname with colorabrev VALUE and add to sku
            for (colorKey in colorAbrevs) {
                if (product["Option1 Value"] === colorKey) {
                colorAbrev = colorAbrevs[colorKey];
                // console.log("ABBREVIATE", colorName, "AS", colorAbrev);
                var sku = product.Handle + "-" + colorAbrev + "-" + sizeAbrev;
                console.log("SKU", sku);
                var prodUrl = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg"
                var imageSrc = prodUrl;
              } 
                      // generate defualt color Img Src
              if (product.defaultImgColor === colorKey ) {
                // then create image src
                var defaultImgSrc = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg";
              }
              // console.log ("Onesie SKU", sku)
            }
          }
        }
        // hack to work for one product, need to catch else's
      } else if (product.Item === "Poster") {
        for (abrevKey in posterSizeNameAbreviation) {
          if(product["Option2 Value"] === abrevKey) {
            // console.log("ONSIE SIZE", product.sizes)
            var sizeAbrev = posterSizeNameAbreviation[abrevKey]
            // build sku with color abbrev
            // if colorName === key in colorabreves)
            // then replace colorname with colorabrev VALUE and add to sku
            for (colorKey in colorAbrevs) {
                if (product["Option1 Value"] === colorKey) {
                colorAbrev = colorAbrevs[colorKey];
                // console.log("ABBREVIATE", colorName, "AS", colorAbrev);
                var sku = product.Handle + "-" + colorAbrev + "-" + sizeAbrev;
                console.log("SKU", sku);
                var prodUrl = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg"
                var imageSrc = prodUrl;
              } 
                      // generate defualt color Img Src
              if (product.defaultImgColor === colorKey ) {
                // then create image src
                var defaultImgSrc = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg";
              }
              // console.log ("Onesie SKU", sku)
            }
          }
        }
        // hack to work for one product, need to catch else's
      } else if (product.Item === "Mug") {
        for (abrevKey in mugSizeNameAbreviation) {
          if(product["Option2 Value"] === abrevKey) {
            // console.log("ONSIE SIZE", product.sizes)
            var sizeAbrev = mugSizeNameAbreviation[abrevKey]
            // build sku with color abbrev
            // if colorName === key in colorabreves)
            // then replace colorname with colorabrev VALUE and add to sku
            for (colorKey in colorAbrevs) {
                if (product["Option1 Value"] === colorKey) {
                colorAbrev = colorAbrevs[colorKey];
                // console.log("ABBREVIATE", colorName, "AS", colorAbrev);
                var sku = product.Handle + "-" + colorAbrev + "-" + sizeAbrev;
                console.log("SKU", sku);
                var prodUrl = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg"
                var imageSrc = prodUrl;
              } 
                      // generate defualt color Img Src
              if (product.defaultImgColor === colorKey ) {
                // then create image src
                var defaultImgSrc = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg";
              }
              // console.log ("Onesie SKU", sku)
            }
          }
        }
        // hack to work for one product, need to catch else's
      } else {
        for (abrevKey in sizeNameAbreviation) {
          // if sizes match
          if(product["Option2 Value"] === abrevKey) {
            var sizeAbrev = sizeNameAbreviation[abrevKey]
            for (colorKey in colorAbrevs) {
              // if colors match
              colorAbrev = colorAbrevs[colorKey];
              
              if (product["Option1 Value"] === colorKey) {
                // console.log("ABBREVIATE", colorName, "AS", colorAbrev);
                var sku = product.Handle + "-" + colorAbrev + "-" + sizeAbrev;
                console.log("SKU", sku);
                var prodUrl = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg"

              } 
                  // generate defualt color Img Src
              if (product.defaultImgColor === colorKey ) {
                // then create image src
                var defaultImgSrc = "http://productuploader.com/product/uploader/" + product.Handle + "-" + colorAbrev + ".jpg";
                 // console.log("****defaultImgSrcWITHINFOR****", defaultImgSrc)
                 var defaultImgObj = {"Default ImgSrc": defaultImgSrc}
              }

            }
          }
        }
      } 
      
      // console.log("Color size array before merge with sku", colorSizeArray)
      // console.log("****defaultImgSrc****", defaultImgSrc)
      var mergeSkuUrlObj = {"Variant SKU": sku,
                            "Variant Image": prodUrl,
                            "IMGSRC": defaultImgSrc
                            }
      // if (defaultImgObj) {
      //   console.log("@@defaultImgObj@@", defaultImgObj)
      // }
      // console.log("@mergeSkuUrlObj", mergeSkuUrlObj)
      var productAttributesDetailedImgSrc = merge(mergeSkuUrlObj, colorSizeArray[i])                          
      sizeAbrevArray.push(productAttributesDetailedImgSrc)
      // console.log("SIZEABREVARRAY IN AbrevsSIZENAMES", sizeAbrevArray)
    }
    // console.log("sizeAbrevArray", sizeAbrevArray)
    return addSizeWeights(sizeAbrevArray);
}

// abrevsSizeNames(csvTemplate)

function addSizeWeights (array) {

  // sizeWeightArray = []
  // console.log("hola from add addSizeWeights")
  // console.log("@SIZEABREVARRAY", array)

  // make sure free boolean in sizeAbrev array
  // if freeish == true
  //  and if size = sm || md || lg || xl
  //    then add freeish / wheight
  //  else (2xl, 3xl) 
  //    price = +$5,
  //    freeish wieght
  // else :

  for(var i = 0; i < array.length; i++) {
    if(array[i].freeish && array[i]['Option2 Value'] === 'Small' || 
      array[i].freeish && array[i]['Option2 Value'] === 'Medium' || 
      array[i].freeish && array[i]['Option2 Value'] === 'Large' || 
      array[i].freeish && array[i]['Option2 Value'] === 'XL' ) {

      var freeishSizeWeight = {
        'Variant Grams': 367,
        // 'size': array[i]['Option2 Value']
      }

      var freeishSizeWeightObj = merge(array[i], freeishSizeWeight)
      sizeWeightArray.push(freeishSizeWeightObj)

    } else if(array[i].freeish && array[i]['Option2 Value'] === '2XL' || 
      array[i].freeish && array[i]['Option2 Value'] === '3XL') {

      var freeishBigSizeWeight = {
        'Variant Grams': 367,
        'Variant Price': (Number(array[i]['Variant Price']) + 5)
      }

      var freeishBigSizeWeightObj = merge(array[i], freeishBigSizeWeight)
      sizeWeightArray.push(freeishBigSizeWeightObj)


    } else if (!array[i].freeish) {
      console.log("EFREESISH FSALE")
      // console.log("array[i].Item", array[i]["Item"])
      for (var j = 0; j < sizeWeight.length; j++) { 
        // console.log("sizeWeight[j]", sizeWeight[j])
        // if items match and sizes match
        if(array[i]["Item"] === sizeWeight[j]["item"] 
          && array[i]["Option2 Value"] === sizeWeight[j]["size"] ) {
            var sizeWeightObj = merge(array[i], sizeWeight[j])
            // console.log("colorSizeWight****", sizeWeightObj)
            sizeWeightArray.push(sizeWeightObj)
        }
      }
    }
  }
  console.log("sizeWeightARR$", sizeWeightArray)
  return addFirstRowDetails(sizeWeightArray);
}

function addFirstRowDetails (array) {
  // masterProductCsvTemplate = []
  // 1. merge colorsizearray[0] w/ productAttributesDetailed then productAttributesDefaults 
  // get primary color
  // var primaryImgColor = array[0]["ImgSrc"]
  // console.log("sizeWeightArray[0]", sizeWeightArray[0]);
  // match color to 

  var imageSrc = {"Image Src": array[0]["IMGSRC"]}
  console.log("REAL IMG SRC", imageSrc)
  
  // var imageSrc = {"Image Src": array[0]["Variant Image"]}
  var mergeImgSrc = merge(array[0], imageSrc)
  var firstRow = merge(array[0], productAttributesDetailed);
  // var firstRowImgSrc = merge(firstRow,  )
  array[0] = firstRow;

  // console.log("csvTemplate", csvTemplate)
  // 2. merge colorsizearray[1++] w/ productAttributesDefaults
  // now you need to iterate through each product and add size weights 
  // now send each obj within local template to master template:
  for(var i=0; i < array.length; i++) {
    masterProductCsvTemplate.push(array[i])
  }
  
  // console.log("MASTER TEMPLATE", masterProductCsvTemplate)

  return masterProductCsvTemplate
}
  
module.exports = testing;
