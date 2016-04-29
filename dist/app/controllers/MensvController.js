app.controller('MensvController', MensvController)
// ProductsController.$inject = ['$scope', '$http'];
function MensvController ($scope, $http, productService) {
  console.log("MensV controller")

  $scope.product = {
                    item: "Men's V",
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
                            },                    
                    sizes: {"Small": false,
                            "Medium": true,
                            "Large": true,
                            "XL": false,
                            "2XL": false,
                            "3XL": false},
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 25,
                    short: "mv"
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