app.controller('TotebagController', TotebagController)
// ProductsController.$inject = ['$scope', '$http'];
function TotebagController ($scope, $http) {
  console.log("Sweatshirt controller")

  $scope.product = {
                    item: "Totebag",
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