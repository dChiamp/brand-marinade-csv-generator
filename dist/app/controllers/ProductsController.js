app.controller('ProductsController', ProductsController)

ProductsController.$inject = ['$scope', '$http'];

function ProductsController ($scope, $http) {
  console.log("products controller")

  var vm = this;
  vm.getAllProducts = getAllProducts;

  vm.allProducts = [];


  $scope.selected = [];
  $scope.data = {};
  // refactor items as objects to nest atrributes onCheck
  $scope.products = [{
                  item: "Crewneck",
                  sizes: ["small", "medium", "large"],
                  colors: ["red", "blue", "green"],
                  brands: [],
                  tags: [],
                  price: 45
                  },
                  {
                  item: "Hoodie",
                  sizes: ["small", "medium", "large"],
                  colors: ["red", "blue", "green"],
                  brands: [],
                  tags: [],
                  price: 45
                  }
                  ];

    $scope.crewneck = {
                      item: "Crewneck",
                      sizes: [ {small: true}, {medium: true}, {large: true} ],
                      colors: [ {red: true}, {blue: true}, {green: true} ],
                      brands: [],
                      tags: [],
                      price: 50
                    };

  $scope.newProduct = {}

  $scope.skuGenerator = function () {
    var sku = $scope.newProduct.clientName + "-" + $scope.newProduct.designName;
    console.log("newProduct:", $scope.newProduct, "sku:", sku)
  }


  $scope.checkedParent = false;
  $scope.checkedTrue = function(){
    // $scope.checkedParent = !$scope.checkedParent
    $scope.checkedParent = true;
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

  $scope.isChecked = function() {
    // return $scope.selected.length === $scope.items.length;
    !$scope.checkedParent 
    // return true
  };

  function getAllProducts() {
    $http
      .get('/api/products')
      .then(function(response) {
        console.log("get all products", response.data)
        vm.allProducts.push(response.data);
      })
  }


} 