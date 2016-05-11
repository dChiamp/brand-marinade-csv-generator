app.controller('ProductsController', ProductsController)

// ProductsController.$inject = ['$scope', '$http', 'productService'];

function ProductsController ($scope, $http, productService, FileSaver, Blob, $filter) {
  console.log("products controller")

  var vm = this;
  vm.getAllProducts = getAllProducts;

  vm.allProducts = [];


  // $scope.selected = [];
  // $scope.data = {};
  // refactor items as objects to nest atrributes onCheck

  // $scope.designName;
  $scope.product = {}
  $scope.hideForms = true;

  
   $scope.boggle = function() {
      // $scope.submitted = !true
      console.log("submitted?")
  } 
  // $scope.submitted = false
  // $scope.product.title = {}
 
  $scope.skuGenerator = function () {
    // var sku = $scope.product.clientName + "-" + $scope.newProduct.designTitle;
    var designTitle = $scope.product.title
    // $scope.product.title = {title: designTitle}
    // console.log("TITLE:", $scope.product)
    productService.saveProductSettings($scope.product);
  }

  $scope.designNames = {"Published": false};
  $scope.submitted = false

  $scope.addDesignName = function () {
    var designTitle = $scope.designNames.title
    var designHandle = $scope.designNames.designHandle
    var marketplace = $scope.designNames.marketplace
    var designTags = $scope.designNames.tags

    $scope.submitted = !$scope.submitted;
    $scope.hideForms = !$scope.hideForms;

    console.log("submitted?", $scope.submitted)
    console.log("TITLE:", $scope.designNames)
    productService.addNameToProd($scope.designNames);
  }

  function getAllProducts() {
    $http
      .get('/api/products')
      .then(function(response) {
        console.log("get all products", response.data)
        vm.allProducts.push(response.data);
      })
  }

  // $scope.save = function() {
  //   productService.saveProductSettings();
  // };

  $scope.generateCsvName = function (handle) {
    // console.log("handle", handle)
    productService.nameFile(handle);
    productService.convertAndDownloadCsv();
  }


var test = {
  "product": {
    "title": "Burton Custom Freestlye 151",
    "body_html": "<strong>Good snowboard!<\/strong>",
    "vendor": "Burton",
    "product_type": "Snowboard",
    "published": false
  }
}

$scope.testApi = function () {
  console.log("hit Test");
   $http
      .post('https://9852e9327df153b6303e9d74c09077b4:78f1c269ac2e9642240f588bec8548fd@printing-site.myshopify.com/admin/products.json', test)
      .then(function(response) {
        console.log("Test response", response.data)
      }, function error (response) {
        console.log("ERROR:", response);
      })
}




} 

