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
// test for setting header in dom w/ ngcsv
  $scope.headerFieldA = "testFieldA";

  $scope.csvTemplate.product = {
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

  function createColorSizeObj () {
    for (colorName in product.colors) {
      var colorBoolean = product.colors[colorName]
      // if color is true, iterate through sizes
      if (colorBoolean) {
        for (sizeName in product.sizes) {
          var sizeBoolean = product.sizes[sizeName]
          //if both are true, create obj and bind
            $scope.csvTemplate.colorSizeArr = []
          if(colorBoolean && sizeBoolean) {
            var colorSize = colorName + sizeName;
            console.log("COLORSiZE", colorSize)
            $scope.csvTemplate[colorSize] = {}
            $scope.csvTemplate[colorSize].color = colorName;
            $scope.csvTemplate[colorSize].size = sizeName;
          }
            $scope.csvTemplate.colorSizeArr.push($scope.csvTemplate[colorSize])
        }
      }
    }
  }

  // createColorSizeObj();

   // console.log("product color", product.colors.red)
  function iterateThruNewProd () {
    for (prodKey in product) {
      // iterate thru prod obj, and get all prodKeys and vals
      var prodKeyVal = product[prodKey]
      // console.log("for prodKey in product:", prodKey)
      // console.log("for prodKeyVal", prodKeyVal);
      // bind each data to scope 
      if (prodKey === "item") {
        $scope.csvTemplate.item = prodKeyVal
        console.log("SCOPE ITEM", $scope.csvTemplate.item)
      }
      if (prodKey === "price") {
        $scope.csvTemplate.price = prodKeyVal
      }
      if (prodKey === "brands") {
        $scope.csvTemplate.brands = prodKeyVal
      }
      if (prodKey === "tags") {
        $scope.csvTemplate.tags = prodKeyVal
      }
      // iterate thru colors
      if (prodKey === "colors") {
        for (colorKeyName in prodKeyVal) {
          console.log("color name", colorKeyName)
          var colorBoolean = prodKeyVal[colorKeyName]
          // if color is true(selected)
          // if (prodKeyVal.red) {
            if (colorBoolean) {
            $scope.csvTemplate.color = colorKeyName;
            console.log("SCOPE.COLOR:",  $scope.csvTemplate.color)
            // console.log("COLOR" +colorKeyName+ " SLCTD")
            // iterate through all sizes
            for (sizeKeyName in product.sizes) {
              sizeBoolean = product.sizes[sizeKeyName]
              console.log("SIZE BooLEAN", sizeBoolean)
              // if size is true (selected)
              if(sizeBoolean) {
                // bind it as color.size
                console.log("sizeKeyName:", sizeKeyName)
                // need to figure out how to add size to color
                // $scope.csvTemplate.color.size = sizeKeyName;
                $scope.csvTemplate.size = sizeKeyName;
                console.log("DATa.Size", $scope.csvTemplate.size);
              }
            }
          }
          // console.log("for prodKey in COLORS:", val);
          // console.log("colorBoolean", colorBoolean )
          // if (colorBoolean == true ) {
          // if colors val = true, then iterate through sizes
            // console.log("INCLUDE THIS COLOR")
          // } else {
            // console.log("DONT INCLUDE THIS COLOR")
          // }
          // only push if size = true
        }
      }
    }
  }
  // iterateThruNewProd();

  var sku = "derek-geo-test";
  var title = "octa-death";
  var vendor = "American Apparel";
  var type = "sweatshirt";
  var tags= ["gnar", "rad"];
  var color = "red";;
  var size = "Large";
  var body = "dereks design " + type;

  // console.log(body)

  $scope.csvTestTemplate = {}

  // naive
  // iterate through product.sizes
  // if size.colors.x = true
  // push to an obj
  // then push that obj to csvTemplate.data

  // ?in template.data the field prodKey should call a fnc to iterate through

  // 1.0
  // move all of this to back end
  // only keep fields changed from dom

  // the first obj in the csvTemplate is the defualt settings,

  // then iterate through each product,
  // and push that obj with only *changed* fields to obj (not array)

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
      // stringify prodKeyVal to insert in obj
      // call recursvely until it goes through all colors marked true

  // 3.0
  // create a series of helper functions to get right format
  // first function, bind everything to scope accords to name (scope.item)
  // second, map colors to sizes
  // 
  // maybe scope.csvTemplate.colorsize = {color: "red", size: "small"}


  // map weight to sizes //refactor it in later in backend

  // to test parsing objs in backend
  $scope.csvTemplate.testData = {
                    "Handle": sku
                     }

// moved to back end
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

  $scope.csvTemplate.colorsTest = {red: true, blue: true};
  $scope.csvTemplate.colorSizeTest = {};

  // test to name obj programmatically w/ vars
  var colorNameTest = "red";
  var sizeNameTest = "small"
  var colorSizeName = colorNameTest + sizeNameTest;
  $scope.csvTemplate[colorSizeName] = {}
  // its works!

  $scope.csvTemplate.colorSizeTest.color = "red"
  $scope.csvTemplate.colorSizeTest.size = "small"

  // console.log("$scope.csvTemplate.colorsTest.red",$scope.csvTemplate.colorsTest.red )
  console.log("$scope.csvTemplate:", $scope.csvTemplate)
    // put product model in service?
  function convertAndDowload () {
      // console.log("product obj to be converted: ", $scope.product2)
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
