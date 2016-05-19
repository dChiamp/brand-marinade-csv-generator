var shopifyProductObj = {}
var masterArray = []

// first row (main product obj info)
function createLocalProductArray(array) {
  console.log("INCOMING ARRAY OF OBJS", array)
  for (i = 0; i < array.length; i++ ) {
    for(j = 0; j < array[i].length; j++) {
      masterArray.push(array[i][j]);
      // masterArray.push(array[i]);
    }
    // need to iterate through
  }
  // console.log("FOrmatted master Array", masterArray)
  return createShopifyProduct(masterArray)
}

function createShopifyProduct (array) {
  // console.log("master array?", masterArray)
  // console.log("hello from upload helper fnc")
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
    // array.push(masterArray)
    return addProductVariant(masterArray)
}

// product variants (each row / product obj)
function addProductVariant (array) {
  // console.log("shopifyProductObj***" ,shopifyProductObj)
  // console.log("yo from addProductVariant fnc")
  // console.log("MASTER ARRAY BEFORE ADDING VARIANTS", array)
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
    console.log()
    return addProductVariantOptions(array);
  }
  // variant options (size and color)
function addProductVariantOptions (array) {
  for (i = 0; i < array.length; i++) { 
    // cannot have doubles
    // colors
    if (shopifyProductObj.product.options[0].values.indexOf(array[i]["Option1 Value"]) === -1) {
      // console.log("COLORS#:", array[i]["Option1 Value"])
      shopifyProductObj.product.options[0].values.push(array[i]["Option1 Value"]);
      // console.log("color variant option$", shopifyProductObj.product.options[0].values)
    } 
    // sizes
    if (shopifyProductObj.product.options[1].values.indexOf(array[i]["Option2 Value"]) === -1 )
      shopifyProductObj.product.options[1].values.push(array[i]["Option2 Value"])
  }

  return addVariantImgIds(shopifyProductObj)
}

function addVariantImgIds (productObj) {
  for (i = 0; i < productObj.product.variants.length; i++) {
    // the problem is they dont exist yet
    productObj.product.images[0]["variant_ids"].push(productObj.product.variants[i]["id"])
  }

  console.log(" total Obj POSTING TO SHOPIFY:", shopifyProductObj);
  return shopifyProductObj
}

module.exports = createLocalProductArray;