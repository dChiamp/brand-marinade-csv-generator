var json2csv = require('json2csv');
var merge = require('merge');
var testing = require("../converterHelperFunctions.js");
var moment = require('moment');
var request = require('request');

var apiPostUrl = "https://9852e9327df153b6303e9d74c09077b4:78f1c269ac2e9642240f588bec8548fd@printing-site.myshopify.com/admin/products.json"

var testProductPostOld = {
                      "product": {
                        "title": "test3",
                        "body_html": "<strong>Good test3!<\/strong>",
                        "vendor": "biz3",
                        "product_type": "thrashplank3",
                        "published": false
                      }
                    }

var masterArray  = [ { 'Variant SKU': 'json-upload-hoodie-heather-sm',
      'Variant Image': 'http://productuploader.com/product/uploader/json-upload-hoodie-heather.jpg',
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
      'Image Src': 'http://productuploader.com/product/uploader/json-upload-hoodie-heather.jpg',
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
      'Variant Image': 'http://productuploader.com/product/uploader/json-upload-hoodie-heather.jpg',
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
      'Variant Image': 'http://productuploader.com/product/uploader/json-upload-hoodie-ash.jpg',
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
      'Variant Image': 'http://productuploader.com/product/uploader/json-upload-hoodie-ash.jpg',
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
      'Variant Grams': 369 } 
      ]

// got to iterate through array 
// variants are each product
// iterate through (starting at 1)

  var testProductPost =  {
    "product": {
      // "id": 1071559644,
      "title": masterArray[0]["Title"],
      "body_html": masterArray[0]["Body (HTML)"],
      "vendor": masterArray[0]["Vendor"],
      "product_type": masterArray[0]["Type"],
      // "created_at": "2016-04-25T17:00:06-04:00",
      "handle": masterArray[0]["Handle"],
      // "updated_at": "2016-04-25T17:00:06-04:00",
      "published": masterArray[0]["Published"],
      "template_suffix": null,
      "published_scope": "global",
      "tags": masterArray[0]["Tags"],
      "variants": [
        {
          // "id": 1070325119,
          // "product_id": 1071559644,
          // "title": "Default Title",
          "price": masterArray[0]["Variant Price"],
          "sku": masterArray[0]["Variant SKU"],
          // "position": 1,
          "grams": masterArray[0]["Variant Grams"],
          "inventory_policy": "deny",
          "compare_at_price": null,
          "fulfillment_service": "manual",
          "inventory_management": null,
          "option1": masterArray[0]["Option1 Value"],
          "option2": masterArray[0]["Option2 Value"],
          // "option3": masterArray[0]["Option3 Value"],
          // "created_at": "2016-04-25T17:00:06-04:00",
          // "updated_at": "2016-04-25T17:00:06-04:00",
          "taxable": true,
          "barcode": null,
          "image_id": null,
          "inventory_quantity": 1,
          // "weight": 0.0,
          "weight_unit": "oz",
          "old_inventory_quantity": 1,
          "requires_shipping": true
        }
      ],
      "options": [
        // COLOR
        {
          // "id": 1022828722,
          // "product_id": 1071559644,
          "name": masterArray[0]["Option1 Name"],
          "position": 1,
          "values": [
            // colors
            masterArray[0]["Option1 Value"]
          ]
        },
        // is this how you specify more options?
        // size?
        {
          // "id": 1022828722,
          // "product_id": 1071559644,
          "name": masterArray[0]["Option2 Name"],
          "position": 2,
          "values": [
            // colors
            masterArray[0]["Option2 Value"]
          ]
        }
      ],
      // PUT TEST:
       "images": [
                  {
                    // "position": 1,
                    // "updated_at": "2016-04-25T16:58:42-04:00",
                    "src": masterArray[0]["Image Src"],
                    "variant_ids": [
                    ]
                  },
                  {
                    // "position": 2,
                    "src": masterArray[0]["Image Src"],
                    "variant_ids": [
                    ]
                  }
                ]
        }
      }

uploadController = {
  postProduct: function (req, res) {
      console.log("POST REQ FNC HIT!")
      request({
      url: apiPostUrl, //URL to hit
      // qs: {from: 'blog example', time: +new Date()}, //Query string data
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // 'Custom-Header': 'Custom Value'
      },
      body: JSON.stringify(testProductPost) //Set the body product obj
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
      url: apiPostUrl, //URL to hit
      // qs: {from: 'blog example', time: +new Date()}, //Query string data
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          // 'Custom-Header': 'Custom Value'
      },
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            // console.log(response.statusCode, body);
            console.log("response:", response, "BODY", body);
            res.send(response)
        }
    });
  }
}

module.exports = uploadController
