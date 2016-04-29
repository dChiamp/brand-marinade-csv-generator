app.controller('WomensvController', WomensvController)
// ProductsController.$inject = ['$scope', '$http'];
function WomensvController ($scope, $http, productService) {
  console.log("Sweatshirt controller")

  $scope.product = {
                    item: "Women's V",
                    colors: {White: true,
                            Ash: false,
                            BabyBlue: false,
                            Black: false,
                            LightPink: false,
                            Royal: false,
                            Silver: false,
                            VintageRed: false
                            },                    
                    sizes: {"Small": false,
                            "Medium": true,
                            "Large": true,
                            "XL": false,
                            "2XL": false},
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 25,
                    short: "wv"
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