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
// test for taking header in dom w/ ngcsv
  $scope.headerFieldA = "testFieldA";

  var product = {
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
              }

 console.log("product color", product.colors.red)

  for (key in product) {
    // iterate thru prod obj, and get all keys and vals
    var value = product[key]
    // console.log("for key in product:", key)
    // console.log("for value in product", value);
    // bind data to scope 
    if (key === "item") {
      // console.log("ITEM", value)
      $scope.csvTemplate.item = value
      console.log("SCOPE ITEM", $scope.csvTemplate.item)
    }
    if (key === "price") {
      $scope.csvTemplate.price = value
      console.log("SCOPE PRICE", $scope.csvTemplate.price)
    }
    if (key === "brands") {
      $scope.csvTemplate.brands = value
      console.log("SCOPE BRANDS", $scope.csvTemplate.brands)
    }
    if (key === "tags") {
      $scope.csvTemplate.tags = value
      console.log("SCOPE TAGS", $scope.csvTemplate.tags)
    }
    // iterate thru colors
    if (key === "colors") {
      for (val in value) {
        var colorVal = value[val]
        // console.log("for key in COLORS:", val);
        // console.log("for value of colors", colorVal )
        if (colorVal == true ) {
        // if colors val = true, then iterate through sizes
          console.log("INCLUDE THIS COLOR")
        } else {
          // console.log("DONT INCLUDE THIS COLOR")
        }
        // only push if size = true
      }
    }
  }


  var sku = "derek-geo-test";
  var title = "octa-death";
  var vendor = "American Apparel";
  var type = "sweatshirt";
  var tags= ["gnar", "rad"];
  var color = "red";;
  var size = "Large";
  var body = "dereks design " + type;

  console.log(body)

  $scope.csvTestTemplate = {}

  // naive
  // iterate through product.sizes
  // if size.colors.x = true
  // push to an obj
  // then push that obj to csvTemplate.data

  // ?in template.data the field key should call a fnc to iterate through

  // 1.0
  // move all of this to back end
  // only keep fields changed from dom

  // the first obj in the csvTemplate is the defualt settings,

  // then iterate through each product,
  // and push that obj with only *changed* fields to array

  // defualt settings template in backend 
  // $scope.csvTemplate.template //arrray of objs

  // send updated changes
  // $scope.csvTemplate.updated //array
  // push the .updated array to obj

  // now i just need to figure out how to 
  // push the objects in the right order

  // 2.0 order for each prod 
  // the first obj has everything
  // the next obj only push fields that change / always full
    //selects first color, then iterates through all sizes if true
      // ALWAYS INCLUDE: handle, option1 val, size, sku, price, grams, imgsource
      // stringify keyname to insert in obj
      // call recursvely until it goes through all colors marked true


  // create a series of helper functions to get right format

  // map weight to sizes //refactor it in later in backend

  $scope.csvTemplate.testData = {
                    "Handle": sku
                     }

  $scope.csvTemplate.data = [{
                    "Handle": sku, 
                    "Title": title,
                    "Body": body,
                    "Vendor": vendor,
                    "Type": type,
                    "Tags": tags,
                    "Published": "False",
                    "Option1 Name": "Color",
                    "Option1 Value": color,
                    "Option2 Name": "Size",
                    "Option2 Value": size
                    },
                    {
                    "Handle": sku, 
                    "Title": title,
                    "Body": body,
                    "Vendor": vendor,
                    "Type": type,
                    "Tags": tags,
                    "Published": "False",
                    "Option1 Name": "Color",
                    "Option1 Value": color,
                    "Option2 Name": "Size",
                    "Option2 Value": size
                    },
                    {
                    "Handle": sku, 
                    "Option1 Value": color
                    }]

    $scope.product2 = {}

  $scope.newProduct = {}

  console.log("$scope.csvTemplate",$scope.csvTemplate)
    // put product model in service?
  function convertAndDowload () {
      console.log("product obj to be converted: ", $scope.product2)
      // $http
      //   .post('/api/convert', $scope.product)
      //   .then(function(response){
      $http
        .post('/api/convert', $scope.csvTemplate)
        .then(function(response) {
          console.log("CSV from server", response.data)
          var productCSV = response.data
         // call download function
          vm.download(productCSV)
      })

    }

  }
