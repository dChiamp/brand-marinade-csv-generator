app.service('productService', productService)

function productService ($scope) {
  var self = this;

  self.saveProductSettings = saveProductSettings;

  function saveProductSettings () {
    console.log("test");
  }
  // return productService;

};
