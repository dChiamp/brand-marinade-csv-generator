app.controller('WomenstController', WomenstController)
// ProductsController.$inject = ['$scope', '$http'];
function WomenstController ($scope, $http, productService) {
  console.log("Sweatshirt controller");

  $scope.product = {
                    item: "Women's Tee",
                    type: "Women's Tshirt",
                  colors: {"White": false,
                            "Ash": false,
                            "Baby Blue": false,
                            "Black": false,
                            "Light Pink": false,
                            "Royal": false,
                            "Silver": false,
                            "Vintage Red": false
                            },                   
                    sizes: {Small: true,
                            Medium: true,
                            Large: true},
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20,
                    short: "wtee",
                    primaryImgColor: "White"
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