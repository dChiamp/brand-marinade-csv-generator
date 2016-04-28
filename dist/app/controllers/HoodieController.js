app.controller('HoodieController', HoodieController)

HoodieController.$inject = ['$scope', '$http', 'productService'];

function HoodieController ($scope, $http, productService) {

  console.log("hoodie controller")

  $scope.product = {
                    item: "Hoodie",
                    // title: "",
                    colors: {Heather: true,
                            Ash: true,
                            Black: false},
                    sizes: {small: true,
                            medium: false,
                            large: false },
                    // brands: "American Apparel",
                    tags: ["hella cool"],
                    price: 50,
                    short: "hoodie"
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