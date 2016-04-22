app.controller('MugController', MugController)
// ProductsController.$inject = ['$scope', '$http'];
function MugController ($scope, $http) {
  console.log("Mug controller")

  $scope.product = {
                    item: "Mug",
                    colors: {red: true,
                            green: true,
                            blue: false},
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20
                  }
}