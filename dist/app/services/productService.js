app.service('productService', productService)

// productService.$inject = ['$rootScope'];

function productService ($rootScope, $http, FileSaver, Blob) {
  var self = this;

  self.saveProductSettings = saveProductSettings;

  function saveProductSettings(data) {
    console.log(data);
    $http
      .post('/api/convert', data)
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
