app.controller('CrewneckController', CrewneckController)

function CrewneckController () {

  $scope.product = {
                      item: "Crewneck",
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