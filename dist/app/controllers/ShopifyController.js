app.controller('ShopifyController', ShopifyController)

// ShopifyController.$inject = ['$scope', '$http', 'productService'];

function ShopifyController ($scope, $http, productService, FileSaver, Blob, $filter, toastr) {
  console.log("ShopifyController controller")

 $scope.shops = {
    printingSite: false,
    stonedMg: false 
  }

  var shopRoutes = {
    printingSite: "api/printing",
    stonedMg: "api/stoned"
  }

   $scope.getProducts = function () {
    // if shop is selected(true)
    for( shopKey in $scope.shops) {
      if ($scope.shops[shopKey] == true) {
        // find matching route
        for (shopRouteKey in shopRoutes) {
          if (shopRouteKey === shopKey) { 
            // make req
            console.log("shopRoutes[shopRouteKey]", shopRoutes[shopRouteKey])      
            $http
              .get(shopRoutes[shopRouteKey])
              .then(function(response) {
                console.log("all products from shopify:", response)
                // console.log("shopify res body:", response.data.body)
                // add catch instead
              }, function error (response) {
                console.log("ERROR", response)
              });
            }
          }
        }
      }
    }


  $scope.postProducts = function () {
    console.log("POST PRODS")
    for( shopKey in $scope.shops) {
      if ($scope.shops[shopKey] == true) {
        for (shopRouteKey in shopRoutes) {
          if (shopRouteKey === shopKey) {  
            console.log("shopRoutes[shopRouteKey]", shopRoutes[shopRouteKey])      
            $http
              .post(shopRoutes[shopRouteKey])
              .then(function(response) {
                console.log("all products from shopify:", response)
                console.log("shopify res body:", response.data.body)
              }, function error (response) {
                console.log("ERROR", response)
              });
            }
          }
      }
    }
  }
  

}
