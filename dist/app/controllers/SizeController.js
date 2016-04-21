app.controller('SizeController', SizeController);

function SizeController ($scope) {
  console.log("test");

  $scope.foo = "TEST"
  console.log($scope.foo);

  $scope.items =[ 
                "One Size",
                "Small",
                "Medium",
                "Large",
                "XL",
                "XXL",
                "XXXL"
                ]

  // $scope.items = [1,2,3,4,5];
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

  // $scope.isIndeterminate = function() {
  //   return ($scope.selected.length !== 0 &&
  //       $scope.selected.length !== $scope.items.length);
  // };

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