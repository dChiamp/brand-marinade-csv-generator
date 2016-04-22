app.controller('KidtController', KidtController)
// ProductsController.$inject = ['$scope', '$http'];
function KidtController ($scope, $http) {
  console.log("KidsT controller")

  $scope.kidsT = {
                    item: "KidsT",
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