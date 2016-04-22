app.controller('PosterController', PosterController)
// ProductsController.$inject = ['$scope', '$http'];
function PosterController ($scope, $http) {
  console.log("Poster controller")

  $scope.product = {
                    item: "Poster",
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