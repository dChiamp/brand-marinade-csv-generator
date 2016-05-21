app.controller('TotebagController', TotebagController)
// ProductsController.$inject = ['$scope', '$http'];
function TotebagController ($scope, $http, productService, $filter, toastr) {
  console.log("Sweatshirt controller")

  $scope.product = {
                    item: "Tote Bag",
                    type: "Tote Bag",
                    colors: {"Natural": true,
                            "White": false
                            },
                    sizes: {"One-size": true},
                    brands: ["American Apparel"],
                    productTags: "",
                    price: 20,
                    short: "tote",
                    primaryImgColor: "Natural",
                    freeish: false
                  }

  // $scope.product.price = $filter('currency')($scope.product.price, "$")
  

  $scope.checkedParent = false;
  $scope.isChecked = false;
  $scope.showSizes = false;

  $scope.save = function() {
    if ($scope.product.primaryImgColor && $scope.product.colors[$scope.product.primaryImgColor] != true) {
      console.log("Default color selected does not match")
      return toastr.error("Default color selected does not match")
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