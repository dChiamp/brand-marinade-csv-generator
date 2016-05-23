app.service('productService', productService)

// productService.$inject = ['$rootScope'];

function productService ($rootScope, $http, FileSaver, Blob, $filter, toastr) {
  // $rootScope.Published = false
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
  var publish;

  function addNameToProd (designName) {
    title = designName.title;
    designHandle = designName.handle;
    marketplace = designName.marketplace;
    tags = designName.tags

    publish = designName.Published;

    // console.log("PROD SERVICE TITLE:", designHandle)
  }

  function saveProductSettings(productData) {

    // console.log("productData.Publish", productData.Publish)
    // how can you NOT throw ERR if only ONE is true??
    // if (!productData.colors) {
    //   console.log("you must select at least one color")
    // }

    // make sure defualtIMgColor is true
      // if (productData.primaryImgColor && productData.colors[productData.primaryImgColor] != true) {
      //   console.log("Defualt color selected does not match")
      //   return toastr.error("Defualt color selected does not match")
      // } 
    // * return promise so that scope.isChecked only === true if product is saved
    // MOVED TO INDIV CONTROLLERS TO BYPASS PROMISE FOR NOW
    console.log("productData.productTags", productData.productTags)
    productData.price = $filter('currency')(productData.price, "")
    console.log("productData.PRICE", productData.price)


    if (title) {
    // if (productData.colors == true) {
      // console.log("theres a title and im going to add it to the product")
      productData.title = title;
      productData.handle = designHandle;
      productData["Vendor"] = marketplace;
      productData.tags = tags 
      // if(productData.tags) { productData.tags = tags  }
      productData.Published = publish

      console.log("productData.TAGS", tags)

      console.log("PRODUCT W/ NAME FIELDS", productData.handle)

      // only make request if there is title?
      $http
        .post('/api/convert', productData)
        .then(function(response) {
          console.log("CSV from server", response.data)
          var productCSV = response.data
          toastr.success("saved", productData.item);
      }, function error(response) {
          toastr.error("There has been an error :( ")
      });

    }

  }

  // Generate Filename //
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
    FileSaver.saveAs(data, dateAsString + "-" + fileName + ".csv");
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
