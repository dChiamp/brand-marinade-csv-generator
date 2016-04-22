app.controller('SweatshirtController', SweatshirtController)
// ProductsController.$inject = ['$scope', '$http'];
function SweatshirtController ($scope, $http) {
  console.log("Sweatshirt controller")

  $scope.sweatshirt = {
                    item: "sweatshirt",
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