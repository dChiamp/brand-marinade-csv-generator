app.controller('MugController', MugController)
// ProductsController.$inject = ['$scope', '$http'];
function MugController ($scope, $http, $filter) {
  console.log("Mug controller")

  $scope.product = {
                    item: "Mug",
                    type: "Mug",
                    colors: {"White": true,
                            "Black": true
                            },
                    sizes: {small: true,
                            medium: true,
                            large: true },
                    brands: "American Apparel",
                    tags: "hella cool",
                    price: 20
                  }
}