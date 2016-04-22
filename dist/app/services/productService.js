app.service('productService', productService)

// productService.$inject = ['$rootScope'];

function productService ($rootScope) {
  var self = this;

  self.saveProductSettings = saveProductSettings;

  function saveProductSettings(data) {
    console.log(data);
  }


};
