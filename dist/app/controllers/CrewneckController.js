app.controller('CrewneckController', CrewneckController)

function CrewneckController ($scope, $http, productService) {
  // $scope.csvTemplate = {};


  $scope.product = {
                      item: "Crewneck",
                      type: "Sweatshirt",
                      colors: {"Heather Grey": false,
                              "Ash": false,
                              "Black": false},
                      sizes:{"Small": false,
                             "Medium": true,
                             "Large": true,
                             "XL": true,
                             "2XL": true,
                             "3XL": true},
                      // brands: ["American Apparel"],
                      tags: "hella cool",
                      price: 40,
                      short: "crew",
                      primaryImgColor: "Ash"
                    }
  // console.log("product scope:", $scope.product)
  
  $scope.checkedParent = false;
  $scope.isChecked = false

  $scope.save = function() {
    productService.saveProductSettings($scope.product);
    $scope.isChecked = !$scope.isChecked
  };

  $scope.checkedTrue = function(){
    $scope.isChecked = !$scope.isChecked
    console.log("$scope.checkedParent:", $scope.checkedParent)
  };

}