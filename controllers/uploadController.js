var json2csv = require('json2csv');
var merge = require('merge');
var testing = require("../converterHelperFunctions.js");
var moment = require('moment');
var request = require('request');

var apiUrl = "https://9852e9327df153b6303e9d74c09077b4:78f1c269ac2e9642240f588bec8548fd@printing-site.myshopify.com/admin/products.json"

var masterArray  = [ 
    { 'Variant SKU': 'json-upload-hoodie-heather-sm',
      // 'Variant Image': 'http://productuploader.com/product/uploader/json-upload-hoodie-heather.jpg',
      'Variant Image': "https://kickz.akamaized.net/en/media/images/p/288/urban_classics-blank_hoodie-grey-1.jpg",
      IMGSRC: 'http://productuploader.com/product/uploader/json-upload-hoodie-heather.jpg',
      Item: 'Hoodie',
      'Option1 Value': 'Heather Grey',
      'Option2 Value': 'Small',
      Handle: 'json-upload-hoodie',
      'Variant Price': '48.00',
      'Variant Inventory Qty': 1,
      'Variant Inventory Policy': 'deny',
      'Variant Fulfillment Service': 'manual',
      'Variant Requires Shipping': 'TRUE',
      'Variant Taxable': 'TRUE',
      'Variant Weight Unit': 'oz',
      defaultImgColor: 'Heather Grey',
      item: 'Hoodie',
      size: 'Small',
      'Variant Grams': 340,
      // 'Image Src': 'http://productuploader.com/product/uploader/json-upload-hoodie-heather.jpg',
      'Image Src': "http://science-all.com/images/blue/blue-08.jpg",
      Title: 'upload json formatting Hoodie',
      'Body (HTML)': 'upload json formatting Hoodie',
      Vendor: 'tuckers uploads',
      Published: 'FALSE',
      Type: 'Sweatshirt',
      Tags: 'Hoodie,design_json-upload,2016-0516,json2json',
      'Option1 Name': 'Color',
      'Option2 Name': 'Size',
      'Gift Card': 'FALSE' },

    { 'Variant SKU': 'json-upload-hoodie-heather-md',
      // 'Variant Image': 'http://productuploader.com/product/uploader/json-upload-hoodie-heather.jpg',
      'Variant Image': "http://i3.stycdn.net/images/2012/11/47/article/kk54/kk5430603/carhartt-hooded-holbrook-hoodie-grey-heather-1540-zoom-0.jpg",
      IMGSRC: 'http://productuploader.com/product/uploader/json-upload-hoodie-heather.jpg',
      Item: 'Hoodie',
      'Option1 Value': 'Heather Grey',
      'Option2 Value': 'Medium',
      Handle: 'json-upload-hoodie',
      'Variant Price': '48.00',
      'Variant Inventory Qty': 1,
      'Variant Inventory Policy': 'deny',
      'Variant Fulfillment Service': 'manual',
      'Variant Requires Shipping': 'TRUE',
      'Variant Taxable': 'TRUE',
      'Variant Weight Unit': 'oz',
      defaultImgColor: 'Heather Grey',
      item: 'Hoodie',
      size: 'Medium',
      'Variant Grams': 369 },

    { 'Variant SKU': 'json-upload-hoodie-ash-sm',
      // 'Variant Image': 'http://productuploader.com/product/uploader/json-upload-hoodie-ash.jpg',
      'Variant Image': "http://www.theadairgroup.com/images/Adult-Crewneck-Sweatshirt-Sport-Grey_large.jpg",
      IMGSRC: 'http://productuploader.com/product/uploader/json-upload-hoodie-heather.jpg',
      Item: 'Hoodie',
      'Option1 Value': 'Ash',
      'Option2 Value': 'Small',
      Handle: 'json-upload-hoodie',
      'Variant Price': '48.00',
      'Variant Inventory Qty': 1,
      'Variant Inventory Policy': 'deny',
      'Variant Fulfillment Service': 'manual',
      'Variant Requires Shipping': 'TRUE',
      'Variant Taxable': 'TRUE',
      'Variant Weight Unit': 'oz',
      defaultImgColor: 'Heather Grey',
      item: 'Hoodie',
      size: 'Small',
      'Variant Grams': 340 },

    { 'Variant SKU': 'json-upload-hoodie-ash-md',
      // 'Variant Image': 'http://productuploader.com/product/uploader/json-upload-hoodie-ash.jpg',
      'Variant Image': "http://www.theadairgroup.com/images/Adult-Crewneck-Sweatshirt-Sport-Grey_large.jpg",
      IMGSRC: 'http://productuploader.com/product/uploader/json-upload-hoodie-heather.jpg',
      Item: 'Hoodie',
      'Option1 Value': 'Ash',
      'Option2 Value': 'Medium',
      Handle: 'json-upload-hoodie',
      'Variant Price': '48.00',
      'Variant Inventory Qty': 1,
      'Variant Inventory Policy': 'deny',
      'Variant Fulfillment Service': 'manual',
      'Variant Requires Shipping': 'TRUE',
      'Variant Taxable': 'TRUE',
      'Variant Weight Unit': 'oz',
      defaultImgColor: 'Heather Grey',
      item: 'Hoodie',
      size: 'Medium',
      'Variant Grams': 369 
    } 
]

var shopifyProductObj = {}
// first row (main product obj info)
function createShopifyProduct (array) {
  shopifyProductObj =  {
      "product": {
        // "id": 1071559644,
        "title": array[0]["Title"],
        "body_html": array[0]["Body (HTML)"],
        "vendor": array[0]["Vendor"],
        "product_type": array[0]["Type"],
        "handle": array[0]["Handle"],
        "published": array[0]["Published"],
        "template_suffix": null,
        "published_scope": "global",
        "tags": array[0]["Tags"],
        "variants": [],
        "options": [
          // COLOR
          { "name": array[0]["Option1 Name"],
            "position": 1,
            "values": [/* array[i]["Option1 Value"] */] },
          // size
          { "name": array[0]["Option2 Name"],
            "position": 2,
            "values": [] }
        ],
         "images": [ {
            "src": array[0]["Image Src"],
            "variant_ids": []
          } ]
      }
    }
}

// product variants (each row / product obj)
function addProductVariant (array) {
  for (i = 0; i < array.length; i++) {
    var productVariant = {
          "id": i,
          "handle": array[i]["Handle"],
          "price": array[i]["Variant Price"],
          "sku": array[i]["Variant SKU"],
          // "position": 1,
          "grams": array[i]["Variant Grams"],
          "inventory_policy": "deny",
          "compare_at_price": null,
          "fulfillment_service": "manual",
          "inventory_management": null,
          // color
          "option1": array[i]["Option1 Value"],
          // size
          "option2": array[i]["Option2 Value"],
          "taxable": true,
          "barcode": null,
          "image_id": null,
          "inventory_quantity": 1,
          "weight_unit": "oz",
          "old_inventory_quantity": 1,
          "requires_shipping": true
        }
    shopifyProductObj.product.variants.push(productVariant);
    }
  }
  // variant options (size and color)
function addProductVariantOptions (array) {
  for (i = 0; i < array.length; i++) { 
    // cannot have doubles
    if (shopifyProductObj.product.options[0].values.indexOf(array[i]["Option1 Value"]) === -1) {
      shopifyProductObj.product.options[0].values.push(array[i]["Option1 Value"]);
    } 
    if (shopifyProductObj.product.options[1].values.indexOf(array[i]["Option2 Value"]) === -1 )
      shopifyProductObj.product.options[1].values.push(array[i]["Option2 Value"])
  }
}

function addVariantImgIds (productObj) {
  for (i = 0; i < productObj.product.variants.length; i++) {
    // the problem is they dont exist yet
    productObj.product.images[0]["variant_ids"].push(productObj.product.variants[i]["id"])
  }
}

// if local sku === request sku
// get variant id, push it to images

createShopifyProduct(masterArray)
addProductVariant(masterArray);
addProductVariantOptions(masterArray);
addVariantImgIds(shopifyProductObj)

// console.log("base Obj POSTING TO SHOPIFY:", shopifyProductObj);
// console.log("VARIANT Obj POSTING TO SHOPIFY:", shopifyProductObj.product.options);
console.log("IMGS POSTING TO SHOPIFY:", shopifyProductObj.product.images);

uploadController = {
  postProduct: function (req, res) {
      console.log("POST REQ FNC HIT!")
      request({
      url: apiUrl, //URL to hit
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(shopifyProductObj) //stringify the body product obj
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
            res.send(response)
        }
    });
  },
  getAllProducts: function (req, res) {
      request({
      url: apiUrl, //URL to hit
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            console.log("response:", response, "BODY", body);
            res.send(response)
        }
    });
  }
}

module.exports = uploadController