app.controller('TypeController', TypeController)


function TypeController ($scope) {
  console.log("Type Controller");

  $scope.items =[ 
                "Crewneck",
                "Hoodie",
                "Kid's T",
                "Mug",
                "Onesie",
                "Poster",
                "Sweatshirt",
                "Tank Top",
                "Tote Bag",
                "Men's T-shirt",
                "Mens's V-neck",
                "Women's V-neck",
                "Women's T-shirt"
                ]

  $scope.selected = [];

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