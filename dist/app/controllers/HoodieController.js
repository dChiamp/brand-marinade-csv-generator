app.controller('HoodieController', HoodieController)

// HoodieController.$inject = ['$scope', '$http', 'productService', 'toastr'];

function HoodieController ($scope, $http, productService, toastr, $filter) {

  console.log("hoodie controller")

  $scope.product = {
                    item: "Hoodie",
                    // title: "",
                    type: "Sweatshirt",
                    colors: {"Heather Grey": true,
                            "Ash": false,
                            "Black": false,
                            "Navy": false
                          },
                    sizes: {"Small": true,
                            "Medium": true,
                            "Large": true,
                            "XL": true,
                            "2XL": true,
                            "3XL": true},
                    // brands: "American Apparel",
                    tags: "",
                    price: 48,
                    short: "hoodie",
                    primaryImgColor: "Heather Grey",
                    Published: false
                  }


  // $scope.product.price = $filter('currency')($scope.product.price, "$")

  $scope.checkedParent = false;
  $scope.isChecked = false
  $scope.showSizes = false;

  $scope.save = function() {
    productService.saveProductSettings($scope.product);
    $scope.isChecked = !$scope.isChecked
    // toastr.success("saved", $scope.product.item);
  };

  $scope.checkedTrue = function(){
    $scope.isChecked = !$scope.isChecked
    // console.log("$scope.checkedParent:", $scope.checkedParent)
  };

  // $scope.checkedFalse = function(){
  //   $scope.isChecked = false;
  //   console.log("$scope.checkedParent:", $scope.checkedParent)
  // };
}