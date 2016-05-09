app.controller('WomensvController', WomensvController)
// ProductsController.$inject = ['$scope', '$http'];
function WomensvController ($scope, $http, productService) {
  console.log("Sweatshirt controller")

  $scope.product = {
                    item: "Women's V",
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
                    sizes: {"Small": true,
                            "Medium": true,
                            "Large": true,
                            "XL": true,
                            "2XL": true},
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 25,
                    short: "wv",
                    primaryImgColor: "White"
                  }
                  
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