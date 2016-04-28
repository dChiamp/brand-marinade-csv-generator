app.controller('SaveController', SaveController);

function SaveController ($scope, $http, FileSaver, Blob) {
  console.log("SaveController");

  var vm = this;
  vm.convertAndDowload = convertAndDowload;

  $scope.fileName;

  // obj to bind product data to
  $scope.csvTemplate = {};
// name file from browser
  $scope.nameFile = function (fileName) {
    var fileName = $scope.fileName;
    console.log("FILE NAME:", fileName)
  }
 // download file to client
  vm.download = function(text) {
    var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    // var data = new Blob([json], {type: "application/json"});
    FileSaver.saveAs(data, $scope.fileName || "newProduct" + '.txt');
  };

  // console.log("$scope.csvTemplate.colorsTest.red",$scope.csvTemplate.colorsTest.red )
  // console.log("$scope.product:", $scope.product)
    // put product model in service?
  function convertAndDowload () {

    console.log("product obj to be converted: ", $scope.product2)
    $http
      .get('/api/convert')
      .then(function(response) {
        console.log("CSV from server", response.data)
        var productCSV = response.data
       // call download function
        vm.download(productCSV)
    })

  }

}
