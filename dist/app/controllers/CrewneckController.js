app.controller('CrewneckController', CrewneckController)

function CrewneckController ($scope, $http, productService) {
  // $scope.csvTemplate = {};


  $scope.product = {
                      item: "Crewneck",
                      colors: {red: true,
                              green: true,
                              blue: false},
                      sizes: {small: false,
                              medium: true,
                              large: true },
                      brands: ["American Apparel"],
                      tags: ["hella cool"],
                      price: 50
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

  $scope.checkedFalse = function(){
    $scope.isChecked = false;
    console.log("$scope.checkedParent:", $scope.checkedParent)
  };

}