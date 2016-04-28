app.controller('OnesieController', OnesieController)
// ProductsController.$inject = ['$scope', '$http'];
function OnesieController ($scope, $http) {
  console.log("Onesie controller")

  $scope.product = {
                    item: "Onesie",
                  colors: {White: true,
                            BabyBlue: false,
                            Black: false,
                            Heather: false,
                            Kelly: false,
                            Pink: false,
                            Red: false,
                            Royal: false
                            },
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 50
                  }
}