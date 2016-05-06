app.controller('ProductsController', ProductsController)

// ProductsController.$inject = ['$scope', '$http', 'productService'];

function ProductsController ($scope, $http, productService) {
  console.log("products controller")

  var vm = this;
  vm.getAllProducts = getAllProducts;

  vm.allProducts = [];

  // $scope.selected = [];
  // $scope.data = {};
  // refactor items as objects to nest atrributes onCheck

  // $scope.designName;
  $scope.product = {}

  
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
    console.log("TITLE:", $scope.product)
    productService.saveProductSettings($scope.product);
  }

  $scope.designNames
  $scope.submitted = false

  $scope.addDesignName = function () {
    var designTitle = $scope.designNames.title
    var designHandle = $scope.designNames.designHandle
    var marketplace = $scope.designNames.marketplace
    var designTags = $scope.designNames.tags

    $scope.submitted = !$scope.submitted;

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

  $scope.save = function() {
    productService.saveProductSettings();
  };

} 

