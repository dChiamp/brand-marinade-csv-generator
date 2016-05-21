app.controller('WomensvController', WomensvController)
// ProductsController.$inject = ['$scope', '$http'];
function WomensvController ($scope, $http, productService, $filter, toastr) {
  console.log("Sweatshirt controller")

  $scope.product = {
                    item: "Women's V",
                    type: "Women's Tshirt",
                    colors: {"White": true,
                            "Ash": false,
                            "Baby Blue": false,
                            "Black": false,
                            "Light Pink": false,
                            "Royal": false,
                            "Silver": false,
                            "Vintage Red": false
                            },                    
                    sizes: {"Small": true,
                            "Medium": true,
                            "Large": true,
                            "XL": true,
                            "2XL": true},
                    brands: ["American Apparel"],
                    productTags: "",
                    price: 25,
                    short: "wv",
                    primaryImgColor: "White",
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