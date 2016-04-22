app.controller('MensvController', MensvController)
// ProductsController.$inject = ['$scope', '$http'];
function MensvController ($scope, $http) {
  console.log("MensV controller")

  $scope.product = {
                    item: "MensV",
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