app.service('productService', productService)

// productService.$inject = ['$rootScope'];

function productService ($rootScope, $http, FileSaver, Blob) {
  var self = this;

  // $rootScope.product.fileName = {};

 //  // name file from browser
 //  $rootScope.nameFile = function (fileName) {
 //    var fileName = $rootScope.product.fileName;
 //    console.log("FILE NAME:", fileName)
 //  }
 // // download file to client
 //  vm.download = function(text) {
 //    var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
 //    // var data = new Blob([json], {type: "application/json"});
 //    FileSaver.saveAs(data, $rootScope.product.fileName || "newProduct" + '.txt');
 //  };



  self.saveProductSettings = saveProductSettings;
  self.addNameToProd = addNameToProd;

  function addNameToProd (name) {
    productData.title = name
    console.log(name)
  }

  function saveProductSettings(productData) {
    console.log(productData);
    // addNametoProd(productData)
    $http
      .post('/api/convert', productData)
      .then(function(response) {
        console.log("CSV from server", response.data)
        var productCSV = response.data
       // call download function
        download(productCSV)
    })

  }
   // download file to client
  function download (text) {
    var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    // var data = new Blob([json], {type: "application/json"});
    // get filename with rootscope
    // FileSaver.saveAs(data, $scope.fileName || "newProduct" + '.txt');
    FileSaver.saveAs(data, "newProductTest.txt");
  };


};
