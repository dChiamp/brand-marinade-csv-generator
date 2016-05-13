app.controller('PosterController', PosterController)
// ProductsController.$inject = ['$scope', '$http'];
function PosterController ($scope, $http, productService, $filter, toastr) {
  console.log("Poster controller")

  $scope.product = {
                    item: "Poster",
                    type: "Poster",
                    colors: {"Red": true,
                            "White": false,
                            "Blue": false},
                    sizes: {"Small": true,
                            "Medium": true,
                            "Large": true },
                    // brands: ["American Apparel"],
                    price: 50,
                    tags: "hella cool",
                    short:  "poster",
                    primaryImgColor: "Red"
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