app.controller('WomenstController', WomenstController)
// ProductsController.$inject = ['$scope', '$http'];
function WomenstController ($scope, $http, productService) {
  console.log("Sweatshirt controller");

  $scope.product = {
                    item: "WomensT",
                    colors: {White: true,
                            Ash: false,
                            BabyBlue: false,
                            Black: false,
                            LightPink: false,
                            Royal: false,
                            Silver: false,
                            VintageRed: false
                            },                    
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20
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


}