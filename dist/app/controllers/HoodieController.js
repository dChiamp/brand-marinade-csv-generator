app.controller('HoodieController', HoodieController)

HoodieController.$inject = ['$scope', '$http', 'productService'];

function HoodieController ($scope, $http, productService) {

  console.log("hoodie controller")

  $scope.product = {
                    item: "Hoodie",
                    // title: "",
                    type: "Sweatshirt",
                    colors: {"Heather Grey": false,
                            "Ash": false,
                            "Black": false},
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
                    primaryImgColor: "Ash"
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

  // $scope.checkedFalse = function(){
  //   $scope.isChecked = false;
  //   console.log("$scope.checkedParent:", $scope.checkedParent)
  // };
}