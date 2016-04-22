app.controller('MenstController', MenstController)
// ProductsController.$inject = ['$scope', '$http'];
function MenstController ($scope, $http) {
  console.log("MensT controller")

  $scope.product = {
                    item: "MensT",
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