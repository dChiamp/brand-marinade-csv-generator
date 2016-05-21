app.controller('WomenstController', WomenstController)
// ProductsController.$inject = ['$scope', '$http'];
function WomenstController ($scope, $http, productService, $filter, toastr) {
  console.log("Sweatshirt controller");

  $scope.product = {
                    item: "Women's Tee",
                    type: "Women's Tshirt",
                  colors: {"White": true,
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
                    productTags: "",
                    price: 20,
                    short: "wtee",
                    primaryImgColor: "White",
                    freeish: false
                  }
                  
  // $scope.product.price = $filter('currency')($scope.product.price, "$")

  $scope.checkedParent = false;
  $scope.isChecked = false;
  $scope.showSizes = false;

  $scope.save = function() {
    if ($scope.product.primaryImgColor && $scope.product.colors[$scope.product.primaryImgColor] != true) {
      console.log("Default color selected does not match")
      return toastr.error("Defualt color selected does not match")
    } else {
      productService.saveProductSettings($scope.product);
      $scope.isChecked = !$scope.isChecked
    }
  };

  $scope.checkedTrue = function(){
    $scope.isChecked = !$scope.isChecked
    console.log("$scope.checkedParent:", $scope.checkedParent)
  };


}