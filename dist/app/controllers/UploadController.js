app.controller('UploadController', UploadController)

function UploadController ($scope, $http, productService, toastr, $filter) {
  console.log("UploadController")

  var apiUrl = "https://9852e9327df153b6303e9d74c09077b4:78f1c269ac2e9642240f588bec8548fd@printing-site.myshopify.com/admin/products.json"

  $scope.getAllProducts = function () {
    $http
      .get(apiUrl)
      .then(function(response) {
        console.log("all products from shopify:", response)
      }, function error (response) {
        console.log("ERROR", response)
      });
  }

  $scope.uploadProduct = function () {
    $http
      .post(apiUrl)
      .then(function(response) {
        console.log("Upload response from shopify:", response)
      }, function error (response) {
        console.log("ERROR", response)
      });
  }

}

