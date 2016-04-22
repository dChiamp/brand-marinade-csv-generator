app.controller('HoodieController', HoodieController)
// ProductsController.$inject = ['$scope', '$http'];
function HoodieController ($scope, $http) {
  console.log("hoodie controller")

  $scope.hoodie = {
                    item: "hoodie",
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
}