app.controller('KidtController', KidtController)
// ProductsController.$inject = ['$scope', '$http'];
function KidtController ($scope, $http) {
  console.log("KidsT controller")

  $scope.product = {
                    item: "KidsT",
                    colors: {White: true,
                            BabyBlue: false,
                            Black: false,
                            Heather: false,
                            Kelly: false,
                            KeyLime: false,
                            Lavender: false,
                            Navy: false,
                            Orange: false,
                            Pink: false,
                            Red: false,
                            Royal: false,
                            Silver: false,
                            Yellow: false
                            },
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 50
                  }
}