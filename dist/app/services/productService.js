app.service('productService', productService)

// productService.$inject = ['$rootScope'];

function productService ($rootScope, $http, FileSaver, Blob) {
  var self = this;

  self.saveProductSettings = saveProductSettings;
  self.addNameToProd = addNameToProd;

  var title;
  var designHandle;
  var marketplace
  var tags;

  function addNameToProd (designName) {
    title = designName.title;
    designHandle = designName.handle;
    marketplace = designName.marketplace;
    tags = designName.tags

    console.log("PROD SERVICE TITLE:", designHandle)
  }

  function saveProductSettings(productData) {
    console.log("TITLE IN POST REQ:", title)
    // console.log("PRODUCT DATA", productData);
    // addNametoProd(productData)
    if(title) {
      console.log("theres a title and im going to add it to the product")
      productData.title = title;
      productData.handle = designHandle;
      productData["Vendor"] = marketplace;
      productData.tags = tags

      console.log("PRODUCT W/ NAME FIELDS", productData.handle)

      // only make request if there is title?
      $http
        .post('/api/convert', productData)
        .then(function(response) {
          console.log("CSV from server", response.data)
          var productCSV = response.data
      })
    }

  }

};
