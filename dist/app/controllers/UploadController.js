app.controller('UploadController', UploadController)

function UploadController ($scope, $http, productService, toastr, $filter) {
  console.log("UploadController")

  $scope.getAllProducts = function () {
    $http
      .get('api/upload')
      .then(function(response) {
        console.log("all products from shopify:", response)
      }, function error (response) {
        console.log("ERROR", response)
      });
  }

  $scope.uploadProduct = function () {
    $http
      .post('api/upload')
      .then(function(response) {
        console.log("Upload response from shopify:", response)
      }, function error (response) {
        console.log("ERROR", response)
      });
  }

}
