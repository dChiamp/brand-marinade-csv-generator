app.controller('SaveController', SaveController);

function SaveController ($scope, FileSaver, Blob) {
  console.log("SaveController");

  var vm = this;
 
  vm.val = {
    text: 'Hey ho lets go!'
  };
 
  vm.download = function(text) {
    var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    // var data = new Blob([json], {type: "application/json"});
    FileSaver.saveAs(data, 'text.json');
  };

  $scope.fileName = "arrayOfAttrs";

  $scope.headerFieldA = "testFieldA";

    // console.log("get")
    /*cant export embedded objects
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
    */
  $scope.getArray = function () {
    var product = [{
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
                  }]
    return product;

  }

}
