app.controller('TanktopController', TanktopController)
// ProductsController.$inject = ['$scope', '$http'];
function TanktopController ($scope, $http, productService) {
  console.log("Sweatshirt controller")

  $scope.product = {
                    item: "Tank Top",
                  colors: {White: true,
                          BabyBlue: false,
                          Black: false,
                          Heather: false,
                          Kelly: false,
                          Red: false,
                          Tan: false
                          },
                  sizes: {"Small": false,
                          "Medium": true,
                          "Large": true,
                          "XL": false,
                          "2XL": false,
                          "3XL": false},
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20,
                    short: "tank"
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

