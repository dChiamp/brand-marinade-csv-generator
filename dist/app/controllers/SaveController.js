app.controller('SaveController', SaveController);

function SaveController ($scope, FileSaver, Blob) {
  console.log("SaveController");

  var vm = this;
 
  vm.val = {
    text: 'Hey ho lets go!'
  };
 
  vm.download = function(text) {
    var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(data, 'text.txt');
  };

}