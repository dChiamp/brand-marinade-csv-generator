app.controller('CrewneckController', CrewneckController)

function CrewneckController ($scope, $http, productService) {
  // $scope.csvTemplate = {};


  $scope.product = {
                      item: "Crewneck",
                      type: "Sweatshirt",
                      colors: {"Heather Grey": true,
                              "Ash": false,
                              "Black": false},
                      sizes:{"Small": false,
                             "Medium": true,
                             "Large": true,
                             "XL": false,
                             "2XL": false,
                             "3XL": false},
                      // brands: ["American Apparel"],
                      tags: ["hella cool"],
                      price: 40,
                      short: "crew"
                    }
  // console.log("product scope:", $scope.product)
  
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