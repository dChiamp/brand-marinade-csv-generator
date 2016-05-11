app.controller('TotebagController', TotebagController)
// ProductsController.$inject = ['$scope', '$http'];
function TotebagController ($scope, $http) {
  console.log("Sweatshirt controller")

  $scope.product = {
                    item: "Totebag",
                    type: "Totebag",
                    colors: {"Tan": true,
                            "White": true
                            },
                    sizes: {small: true,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 50,
                    primaryImgColor: "White"
                  }

  // $scope.product.price = $filter('currency')($scope.product.price, "$")
  
  $scope.isChecked = false
  // $scope.saved = true;
  // $scope.showSizes = false;

  $scope.save = function() {
    if ($scope.product.primaryImgColor && $scope.product.colors[$scope.product.primaryImgColor] != true) {
      console.log("Default color selected does not match")
      return toastr.error("Defualt color selected does not match")
    } else {
      productService.saveProductSettings($scope.product);
      $scope.isChecked = !$scope.isChecked
    }
  };

  $scope.checkedTrue = function(){
    $scope.isChecked = !$scope.isChecked
    console.log("$scope.checkedParent:", $scope.checkedParent)
  };

}