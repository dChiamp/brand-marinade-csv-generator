app.controller('HoodieController', HoodieController)

HoodieController.$inject = ['$scope', '$http', 'productService'];

function HoodieController ($scope, $http, productService) {

  console.log("hoodie controller")

  $scope.product = {
                    item: "Hoodie",
                    // title: "",
                    type: "Sweatshirt",
                    colors: {"Heather Grey": true,
                            "Ash": true,
                            "Black": false},
                    sizes: {"Small": false,
                            "Medium": true,
                            "Large": true,
                            "XL": false,
                            "2XL": false,
                            "3XL": false},
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