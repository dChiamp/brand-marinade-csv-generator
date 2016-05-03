app.controller('OnesieController', OnesieController)
// ProductsController.$inject = ['$scope', '$http'];
function OnesieController ($scope, $http, productService) {
  console.log("Onesie controller")

  $scope.product = {
                  item: "Onesie",
                  type: "Kids/Infants",
                  colors: {White: true,
                          BabyBlue: false,
                          Black: false,
                          Heather: false,
                          Kelly: false,
                          Pink: false,
                          Red: false,
                          Royal: false
                          },
                  sizes: {"Small": false,
                          "Medium": true,
                          "Large": true,
                          "XL": true,
                          "2XL": true},
                  brands: ["American Apparel"],
                  tags: ["hella cool"],
                  price: 18,
                  short: "onesie"
                }

  $scope.save = function() {
    productService.saveProductSettings($scope.product);
  };

  $scope.checkedParent = false;
  $scope.isChecked = false

  $scope.checkedTrue = function(){
    $scope.isChecked = !$scope.isChecked
    console.log("$scope.checkedParent:", $scope.checkedParent)
  };

}