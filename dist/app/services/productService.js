app.service('productService', productService)

// productService.$inject = ['$rootScope'];

function productService ($rootScope, $http, FileSaver, Blob, $filter) {
  var self = this;

  self.saveProductSettings = saveProductSettings;
  self.addNameToProd = addNameToProd;
  self.nameFile = nameFile
  self.download = download
  self.convertAndDownloadCsv = convertAndDownloadCsv

  var title;
  var designHandle;
  var marketplace
  var tags;

  function addNameToProd (designName) {
    title = designName.title;
    designHandle = designName.handle;
    marketplace = designName.marketplace;
    tags = designName.tags

    console.log("PROD SERVICE TITLE:", designHandle)
  }

  function saveProductSettings(productData) {
    console.log("TITLE IN POST REQ:", title)
    // console.log("PRODUCT DATA", productData);
    // addNametoProd(productData)
    if(title) {
      console.log("theres a title and im going to add it to the product")
      productData.title = title;
      productData.handle = designHandle;
      productData["Vendor"] = marketplace;
      productData.tags = tags

      console.log("PRODUCT W/ NAME FIELDS", productData.handle)

      // only make request if there is title?
      $http
        .post('/api/convert', productData)
        .then(function(response) {
          console.log("CSV from server", response.data)
          var productCSV = response.data
      })
    }

  }

  // TEST AUTOMATIC NAME //

  var fileName

  function nameFile (name) {
    console.log("NAME", name)
      fileName = name
  }

  var dateRaw = Date.now()
  var dateAsString = $filter('date')(dateRaw, "yyyy-MMdd");

  function download (text) {
    var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    // var data = new Blob([json], {type: "application/json"});
    FileSaver.saveAs(data, fileName + dateAsString + ".csv");
  };

    // put product model in service?
  function convertAndDownloadCsv () {

    // console.log("product obj to be converted: ", $scope.product)
    $http
      .get('/api/convert')
      .then(function(response) {
        console.log("CSV from server", response.data)
        var productCSV = response.data
       // call download function
        download(productCSV)
    })

  }

};
