app.controller('CrewneckController', CrewneckController)

function CrewneckController ($scope, $http, productService, $filter, toastr) {
  // $scope.csvTemplate = {};


  $scope.product = {
                      item: "Crewneck",
                      type: "Sweatshirt",
                      colors: {"Heather Grey": true,
                              "Ash": false,
                              "Black": false},
                      sizes:{"Small": true,
                             "Medium": true,
                             "Large": true,
                             "XL": true,
                             "2XL": true,
                             "3XL": true},
                      // brands: ["American Apparel"],
                      productTags: "",
                      price: 40,
                      short: "crew",
                      primaryImgColor: "Heather Grey"
                    }
  // console.log("product scope:", $scope.product)

  // $scope.product.price = $filter('currency')($scope.product.price, "$")
  
  $scope.checkedParent = false;
  $scope.isChecked = false
  $scope.showSizes = false;

  $scope.save = function() {
    if ($scope.product.primaryImgColor && $scope.product.colors[$scope.product.primaryImgColor] != true) {
        // default = grey
        // if product color . grey != true
        // dont work
      console.log("Default color selected does not match")
      return toastr.error("Default color selected does not match")
    } else {
      productService.saveProductSettings($scope.product);
      console.log("PRODUCT TAGS", $scope.product.productTags)
      $scope.isChecked = !$scope.isChecked
    }
  };

  $scope.checkedTrue = function(){
    $scope.isChecked = !$scope.isChecked
    console.log("$scope.checkedParent:", $scope.checkedParent)
  };

}