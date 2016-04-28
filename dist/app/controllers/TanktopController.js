app.controller('TanktopController', TanktopController)
// ProductsController.$inject = ['$scope', '$http'];
function TanktopController ($scope, $http, productService) {
  console.log("Sweatshirt controller")

  $scope.product = {
                    item: "Tanktop",
                  colors: {White: true,
                          BabyBlue: false,
                          Black: false,
                          Heather: false,
                          Kelly: false,
                          Red: false,
                          Tan: false
                          },
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 50
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