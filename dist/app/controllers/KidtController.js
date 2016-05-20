app.controller('KidtController', KidtController)
// ProductsController.$inject = ['$scope', '$http'];
function KidtController ($scope, $http, productService, $filter, toastr) {
  console.log("KidsT controller")

  $scope.product = {
                    item: "Kid's Tee",
                    type: "Kids/Infants",
                    colors: {"White": true,
                            "Baby Blue": false,
                            "Black": false,
                            "Heather Grey": false,
                            "Kelly Green": false,
                            // "Key Lime": false,
                            "Lavender": false,
                            "Navy Blue": false,
                            "Orange": false,
                            "Pink": false,
                            "Red": false,
                            "Royal Blue": false,
                            "Silver": false,
                            "Yellow": false
                            },
                    sizes: {"Size 2": true,
                            "Size 3": true,
                            "Size 4": true,
                            "Size 5/6": true
                           },
                    brands: ["American Apparel"],
                    productTags: "hella cool",
                    price: 18,
                    short: "ktee",
                    primaryImgColor: "White"
                  }

  // $scope.product.price = $filter('currency')($scope.product.price, "$")

  $scope.checkedParent = false;
  $scope.isChecked = false;
  $scope.showSizes = false;

  $scope.save = function() {
    if ($scope.product.primaryImgColor && $scope.product.colors[$scope.product.primaryImgColor] != true) {
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