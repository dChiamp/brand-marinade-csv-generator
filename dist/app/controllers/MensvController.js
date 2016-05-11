app.controller('MensvController', MensvController)
// ProductsController.$inject = ['$scope', '$http'];
function MensvController ($scope, $http, productService, $filter) {
  console.log("MensV controller")

  $scope.product = {
                    item: "Men's V",
                    type: "Tshirt",
                    colors: {"White": false,
                            "Baby Blue": false,
                            "Black": false,
                            "Brown": false,
                            "Charcoal": false,
                            "Gold": false,
                            "Heather Grey": false,
                            "Kelly Green": false,
                            "Maroon": false,
                            "Navy Blue": false,
                            "Orange": false,
                            "Pink": false,
                            "Purple": false,
                            "Red": false,
                            "Royal Blue": false,
                            "Silver": false,
                            "Tan": false,
                            "Turqoise": false,
                            "Yellow": false
                            },                   
                    sizes: {"Small": true,
                            "Medium": true,
                            "Large": true,
                            "XL": true,
                            "2XL": true,
                            "3XL": true},
                    brands: ["American Apparel"],
                    tags: "hella cool",
                    price: 25,
                    short: "mv",
                    primaryImgColor: "White"
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