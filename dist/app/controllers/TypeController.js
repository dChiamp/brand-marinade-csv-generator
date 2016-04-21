app.controller('TypeController', TypeController)


function TypeController ($scope) {
  console.log("Type Controller");


  $scope.selected = [];
  // refactor items as objects to nest atrributes onCheck
  $scope.items = [{item: "Crewneck",
                  sizes: ["small", "medium", "large"],
                  colors: ["red", "blue", "green"],
                  brands: [],
                  tags: []
                  },
                  {item: "Hoodie",
                  sizes: ["small", "medium", "large"],
                  colors: ["red", "blue", "green"],
                  brands: [],
                  tags: []
                  }
                  ]

console.log("sizes: ", $scope.items[0].sizes)



  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.isChecked = function() {
    return $scope.selected.length === $scope.items.length;
  };

  $scope.toggleAll = function() {
    if ($scope.selected.length === $scope.items.length) {
      $scope.selected = [];
    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
      $scope.selected = $scope.items.slice(0);
    }
  };

}