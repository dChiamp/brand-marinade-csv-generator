app.controller('MenstController', MenstController)
// ProductsController.$inject = ['$scope', '$http'];
function MenstController ($scope, $http) {
  console.log("MensT controller")

$scope.product = {
                    item: "MensT",
                    colors: {White: true,
                            BabyBlue: false,
                            Black: false,
                            Brown: false,
                            Charcoal: false,
                            Gold: false,
                            Heather: false,
                            Kelly: false,
                            Maroon: false,
                            Navy: false,
                            Orange: false,
                            Pink: false,
                            Purple: false,
                            Red: false,
                            Royal: false,
                            Silver: false,
                            Tan: false,
                            Turqoise: false,
                            Yellow: false
                            }                    
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20
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