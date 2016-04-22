app.controller('TanktopController', TanktopController)
// ProductsController.$inject = ['$scope', '$http'];
function TanktopController ($scope, $http) {
  console.log("Sweatshirt controller")

  $scope.tanktop = {
                    item: "Tanktop",
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