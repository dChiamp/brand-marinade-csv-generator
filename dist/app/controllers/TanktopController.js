app.controller('TanktopController', TanktopController)
// ProductsController.$inject = ['$scope', '$http'];
function TanktopController ($scope, $http) {
  console.log("Sweatshirt controller")

  $scope.product = {
                    item: "Tanktop",
                  colors: {White: true,
                          BabyBlue: false,
                          Black: false,
                          Heather: false,
                          Kelly: false,
                          Red: false,
                          Tan: false
                          },
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 50
                  }
}