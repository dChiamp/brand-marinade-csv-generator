app.controller('ProductsController', ProductsController)

ProductsController.$inject = ['$scope', '$http', 'productService'];

function ProductsController ($scope, $http, productService) {
  console.log("products controller")

  var vm = this;
  vm.getAllProducts = getAllProducts;

  vm.allProducts = [];

  $scope.selected = [];
  $scope.data = {};
  // refactor items as objects to nest atrributes onCheck

  $scope.crewneck = {
                      item: "Crewneck",
                      colors: {red: true,
                              green: true,
                              blue: false},
                      sizes: {small: false,
                              medium: true,
                              large: true },
                      brands: ["American Apparel"],
                      tags: ["hella cool"],
                      price: 50
                    },

  $scope.newProduct = {}

  $scope.skuGenerator = function () {
    var sku = $scope.newProduct.clientName + "-" + $scope.newProduct.designName;
    console.log("newProduct:", $scope.newProduct, "sku:", sku)
  }


  $scope.checkedParent = false;
  $scope.isChecked = false

  $scope.checkedTrue = function(){
    // $scope.checkedParent = !$scope.checkedParent
    // $scope.checkedParent = true;
    $scope.isChecked = !$scope.isChecked
    console.log("$scope.checkedParent:", $scope.checkedParent)
    // return true;
  };

  $scope.checkedFalse = function(){
    // $scope.checkedParent = !$scope.checkedParent
    // $scope.checkedParent = true;
    $scope.isChecked = false;
    console.log("$scope.checkedParent:", $scope.checkedParent)
    // return true;
  };

  $scope.isParentChecked = function (e) {
    e.prevent.default()
    if ($scope.checkedParent) {
      console.log("isParentChecked?","true")
      return true;
    }
  }

  // $scope.isChecked = function() {
  //   return $scope.selected.length === $scope.items.length;
  //   !$scope.checkedParent 
  //   return true
  // };

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

