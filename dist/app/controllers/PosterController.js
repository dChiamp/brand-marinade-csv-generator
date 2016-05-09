app.controller('PosterController', PosterController)
// ProductsController.$inject = ['$scope', '$http'];
function PosterController ($scope, $http, productService, $filter) {
  console.log("Poster controller")

  $scope.product = {
                    item: "Poster",
                    type: "Poster",
                    colors: {red: false,
                            green: false,
                            blue: false},
                    sizes: {small: true,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: "hella cool",
                    price: 50
                  }
}