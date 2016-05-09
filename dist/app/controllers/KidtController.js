app.controller('KidtController', KidtController)
// ProductsController.$inject = ['$scope', '$http'];
function KidtController ($scope, $http, productService) {
  console.log("KidsT controller")

  $scope.product = {
                    item: "Kid's Tee",
                    type: "Kids/Infants",
                    colors: {"White": false,
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
                    sizes: {"Small": true,
                            "Medium": true,
                            "Large": true,
                            "XL": true
                           },
                    brands: ["American Apparel"],
                    tags: "hella cool",
                    price: 18,
                    short: "ktee",
                    primaryImgColor: "White"
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