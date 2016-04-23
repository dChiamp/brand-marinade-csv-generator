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

  $scope.newProduct = {}

    // put product model in service?
    function convertAndDowload () {
      console.log("product obj to be converted: ", product)
      // $http
      //   .post('/api/convert', $scope.product)
      //   .then(function(response){
        $http.post('/api/convert', product).then(function(response) {
          console.log(response.data)
          var productCSV = response.data
         // call download function
          vm.download(productCSV)
      })

    }

  }
