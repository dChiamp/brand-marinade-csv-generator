app.controller('OnesieController', OnesieController)
// ProductsController.$inject = ['$scope', '$http'];
function OnesieController ($scope, $http) {
  console.log("Onesie controller")

  $scope.onesie = {
                    item: "Onesie",
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