app.controller('TanktopController', TanktopController)
// ProductsController.$inject = ['$scope', '$http'];
function TanktopController ($scope, $http, productService) {
  console.log("Sweatshirt controller")

  $scope.product = {
                  item: "Tank Top",
                  type: "Tank Top",
                  colors: {"White": false,
                          "Baby Blue": false,
                          "Black": false,
                          "Heather Grey": false,
                          "Kelly Green": false,
                          "Red": false,
                          "Tan": false
                          },
                  sizes: {"Small": true,
                          "Medium": true,
                          "Large": true,
                          "XL": true,
                          "2XL": true,
                          "3XL": true},
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20,
                    short: "tank",
                    primaryImgColor: "White"
                  }
  $scope.checkedParent = false;
  $scope.isChecked = false

  $scope.save = function() {
    productService.saveProductSettings($scope.product);
    $scope.isChecked = !$scope.isChecked
  };

  $scope.checkedTrue = function(){
    $scope.isChecked = !$scope.isChecked
    console.log("$scope.checkedParent:", $scope.checkedParent)
  };

}

