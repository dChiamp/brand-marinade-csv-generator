app.controller('SaveController', SaveController);

function SaveController ($scope, $http, FileSaver, Blob) {
  console.log("SaveController");

  var vm = this;
  vm.convertAndDowload = convertAndDowload;
 
  vm.val = {
    text: 'Hey ho lets go!'
  };
 
  vm.download = function(text) {
    var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    // var data = new Blob([json], {type: "application/json"});
    FileSaver.saveAs(data, 'text.txt');
  };

  $scope.fileName = "arrayOfAttrs";

  $scope.headerFieldA = "testFieldA";

  /*cant handle embedded objects
  // if attr.val = true, push to array
  var colors: {red: true,
          green: true,
          blue: false}
  var colorsArray = ["red", "green"]
  // also flattens arrays, so gotta do it row by row
  var product = [{
                  item: "hoodie",
                  colors: ["red", "green", "blue"],
                  sizes: ["small", "medium"],
                  brands: ["American Apparel"],
                  tags: ["hella cool"],
                  price: 50
                }]
  //makes more sense now to handle this on server
  */
  // $scope.getArray = function () {
  //   var product = [{
  //                   item: "Crewneck",
  //                   colors: {red: true,
  //                           green: true,
  //                           blue: false},
  //                   sizes: {small: false,
  //                           medium: true,
  //                           large: true },
  //                   brands: ["American Apparel"],
  //                   tags: ["hella cool"],
  //                   price: 50
  //                 }]
  //   return product;

  // }

  var product = {
                    item: "Crewneck",
                    colors: {red: true,
                            green: true,
                            blue: false},
                    sizes: {small: false,
                            medium: true,
                            large: true },
                    brands: ["American Apparel"],
                    tags: ["hella cool"],
                    price: 50
                  }

  $scope.newProduct = {}

    // put product model in service?
    function convertAndDowload () {
      console.log("product obj to be converted: ", product)
      // $http
      //   .post('/api/convert', $scope.product)
      // //   .then(function(response){
        $http.post('/api/convert', product).then(function(response) {
          console.log(response.data)
          var productCSV = response.data

          vm.download(productCSV)

    
      // //     $scope.newProduct = {response.data}
      // //     // call download function
      })

  // just need an ng download, dont need to convert
    }

  }
