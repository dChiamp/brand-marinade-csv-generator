app.controller('WomenstController', WomenstController)
// ProductsController.$inject = ['$scope', '$http'];
function WomenstController ($scope, $http, productService) {
  console.log("Sweatshirt controller");

  $scope.product = {
                    item: "Women's Tee",
                    colors: {White: true,
                            Ash: false,
                            BabyBlue: false,
                            Black: false,
                            LightPink: false,
                            Royal: false,
                            Silver: false,
                            VintageRed: false
                            },                    
                    sizes: {Small: false,
                            Medium: true,
                            Large: true},
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20,
                    short: "wtee"
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