app.controller('WomensvController', WomensvController)
// ProductsController.$inject = ['$scope', '$http'];
function WomensvController ($scope, $http) {
  console.log("Sweatshirt controller")

  $scope.product = {
                    item: "Women's V-neck",
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