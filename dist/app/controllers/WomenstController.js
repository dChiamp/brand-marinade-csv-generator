app.controller('WomenstController', WomenstController)
// ProductsController.$inject = ['$scope', '$http'];
function WomenstController ($scope, $http) {
  console.log("Sweatshirt controller");

  $scope.product = {
                    item: "WomensT",
                    colors: {White: true,
                            Ash: false,
                            BabyBlue: false,
                            Black: false,
                            LightPink: false,
                            Royal: false,
                            Silver: false,
                            VintageRed: false
                            }                    
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20
                  }

}