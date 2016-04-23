app.controller('SaveController', SaveController);

function SaveController ($scope, $http, FileSaver, Blob) {
  console.log("SaveController");

  var vm = this;
  vm.convertAndDowload = convertAndDowload;
 
  $scope.fileName;

  $scope.nameFile = function (fileName) {
    var fileName = $scope.fileName;
    console.log("FILE NAME:", fileName)
  }
 
  vm.download = function(text) {
    var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    // var data = new Blob([json], {type: "application/json"});
    FileSaver.saveAs(data, $scope.fileName + '.txt');
  };


  $scope.headerFieldA = "testFieldA";


  var product = [{
                    item: "Crewneck",
                    colors: {red: true,
                            green: true,
                            blue: false},
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel", "gildan", "china merch"],
                    tags: ["hella cool"],
                    price: 50
                  }]

  var csvTemplate = [ 
                    {
                      VariantWeightUnit: "oz",
                      VariantImage: "URL",
                      GoogleShoppingCustomLabel4: "",
                      GoogleShoppingCustomLabel3: "",
                      GoogleShoppingCustomLabel2: "",
                      GoogleShoppingCustomLabel1: "",
                      GoogleShoppingCustomLabel0: "",
                      GoogleShoppingCustomProduct: "",
                      GoogleShoppingCondition: "",
                      GoogleShoppingAdWordsLabels: "",
                      GoogleShoppingAdWordsGrouping: "",
                      Description: "",
                      SEOTitle: "",
                      GoogleShoppingGoogleProductCategory: "",
                      GoogleShoppingGender: "",
                      GoogleShoppingMPN: "",
                      GiftCard: "FALSE",
                      ImageSrc: "URL",
                      TaxableVariantBarcode: "null",
                      ShippingVariant: "TRUE",
                      VariantRequires: "TRUE",
                      VariantCompareAtPrice: "null",
                      VariantPrice: "Number",
                      VariantFulfillmentService: "manual",
                      VariantInventoryPolicy: "deny",
                      VariantInventoryQty: "1",
                      VariantInventoryTracker: "null",
                      VariantGrams: "Number",
                      VariantSKU: "FULL SKU (generate from input)",
                      Option3Value: "null",
                      Option3Name: "null",
                      Option2Value: "size Value",
                      Option2Name: "Size",
                      Option1Value: "color Name",
                      Option1Name: "Color",
                      Published: "Boolean",
                      Tags: "comma seperated array",
                      Type: "product type",
                      Vendor: "site name",
                      Body: "html name",
                      Title: "design name",
                      Handle: "SKU_Name"
                    }
                    ]

    var objOfObjs = {
                      firstNames: {Handle: "Title", handle1: "sku-product-1"},
                      lastNames: { handle1: "name string 1", person2: "Paterson" }
                    }
    var try1 =  [
                    {
                      Body: "html name",
                      Title: "design name",
                      Handle: "SKU_Name"
                    }
                  ]

    var try3 =  [
                {
                  Body: "html name",
                  Title: "design name",
                  Handle: {SKU_Name_1: "skuName1", SKU_Name_2: "skuName2"}
                }
              ]


var arrayOfArrays = [ ["Joe", "jon", "jack"], ["Sue", "sam", "sal" ] ]

  $scope.newProduct = {}

    // put product model in service?
    function convertAndDowload () {
      console.log("product obj to be converted: ", try3)
      // $http
      //   .post('/api/convert', $scope.product)
      //   .then(function(response){
      $http
        .post('/api/convert', try3)
        .then(function(response) {
          console.log("CSV from server", response.data)
          var productCSV = response.data
         // call download function
          vm.download(productCSV)
      })

    }

  }
