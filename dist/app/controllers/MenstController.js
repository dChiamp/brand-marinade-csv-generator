app.controller('MenstController', MenstController)
// ProductsController.$inject = ['$scope', '$http'];
function MenstController ($scope, $http) {
  console.log("MensT controller")

  $scope.product = {
                    item: "MensT",
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

  $scope.checkedParent = false;
  $scope.isChecked = false

  $scope.checkedTrue = function(){
    $scope.isChecked = !$scope.isChecked
    console.log("$scope.checkedParent:", $scope.checkedParent)
  };

  $scope.checkedFalse = function(){
    // $scope.checkedParent = !$scope.checkedParent
    $scope.isChecked = false;
    console.log("$scope.checkedParent:", $scope.checkedParent)
  };

  $scope.save = function() {
    productService.saveProductSettings($scope.product);
  };

}