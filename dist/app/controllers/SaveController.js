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


  var sku = "derek-geo-test";
  var title = "octa-death";
  var vendor = "American Apparel";
  var type = "sweatshirt";
  var tags= ["gnar", "rad"];
  var color = "red";;
  var size = "Large";
  var body = "dereks design " + type;

  console.log(body)

  $scope.csvTemplate = {};

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
                    }]

    $scope.product2 = {}

    $scope.product2.fields = ['car', 'price', 'color'];
    // arr of objs, so push prod obj to it
    $scope.product2.myCars = [
      {
        "car": "Audi",
        "price": 40000,
        "color": "blue"
      }, {
        "car": "BMW",
        "price": 35000,
        "color": "black"
      }, {
        "car": "Porsche",
        "price": 60000,
        "color": "green"
      }
    ];



  $scope.newProduct = {}
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
