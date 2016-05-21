app.controller('MugController', MugController)
// ProductsController.$inject = ['$scope', '$http'];
function MugController ($scope, $http, productService, $filter, toastr) {
  console.log("Mug controller")

  $scope.product = {
                    item: "Mug",
                    type: "Mug",
                    colors: {"White": true,
                            "Black": false
                            },
                    sizes: {"12oz": true,
                            "16oz": true,
                           },
                    price: 20,
                    brands: "American Apparel",
                    productTags: "",
                    short: "mug",
                    primaryImgColor: "White",
                    freeish: false
                  }

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