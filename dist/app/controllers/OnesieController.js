app.controller('OnesieController', OnesieController)
// ProductsController.$inject = ['$scope', '$http'];
function OnesieController ($scope, $http, productService, $filter) {
  console.log("Onesie controller")

  $scope.product = {
                  item: "Onesie",
                  type: "Kids/Infants",
                  colors: {"White": true,
                          "Baby Blue": false,
                          "Black": false,
                          "Heather Grey": false,
                          "Kelly Green": false,
                          "Light Pink": false,
                          "Vintage Red": false,
                          "Royal Blue": false
                          },
                  sizes: {"Newborn": true,
                          // "medium": true,
                          "6M": true,
                          "12M": true,
                          "18M": true,
                          "24M": true},
                  brands: ["American Apparel"],
                  tags: "hella cool",
                  price: 18,
                  short: "onesie",
                  primaryImgColor: "White"
                }
  
  // $scope.product.price = $filter('currency')($scope.product.price, "$")

  $scope.checkedParent = false;
  $scope.isChecked = false;
  $scope.showSizes = false;

  $scope.save = function() {
    productService.saveProductSettings($scope.product);
    $scope.isChecked = !$scope.isChecked
  };

  $scope.checkedTrue = function(){
    $scope.isChecked = !$scope.isChecked
    console.log("$scope.checkedParent:", $scope.checkedParent)
  };

}