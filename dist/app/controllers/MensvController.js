app.controller('MensvController', MensvController)
// ProductsController.$inject = ['$scope', '$http'];
function MensvController ($scope, $http) {
  console.log("MensV controller")

  $scope.product = {
                    item: "MensV",
                    colors: {White: true,
                            BabyBlue: false,
                            Black: false,
                            Brown: false,
                            Charcoal: false,
                            Gold: false,
                            Heather: false,
                            Kelly: false,
                            Maroon: false,
                            Navy: false,
                            Orange: false,
                            Pink: false,
                            Purple: false,
                            Red: false,
                            Royal: false,
                            Silver: false,
                            Tan: false,
                            Turqoise: false,
                            Yellow: false
                            }                    
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 20
                  }
}