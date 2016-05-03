app.controller('MugController', MugController)
// ProductsController.$inject = ['$scope', '$http'];
function MugController ($scope, $http) {
  console.log("Mug controller")

  $scope.product = {
                    item: "Mug",
                    type: "Mug",
                    colors: {"White": true,
                            "Black": true
                            },
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20
                  }
}