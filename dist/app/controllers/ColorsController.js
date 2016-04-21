app.controller('ColorsController', ColorsController)

ColorsController.$inject = ['$scope'];

function ColorsController ($scope) {
  console.log("test");

  $scope.foo = "TEST"
  console.log($scope.foo);

  $scope.items =[ 
                "Heather Grey",
                "Lavender",
                "White",
                "Baby Blue",
                "Yellow",
                "Pink",
                "Silver",
                "Tan",
                "Ash",
                "Vintage Red"
                ]

  $scope.selected = [];
  $scope.data = {};
  $scope.data.cb1 = false;
  // refactor items as objects to nest atrributes onCheck
  $scope.products = [{
                  item: "Crewneck",
                  sizes: ["small", "medium", "large"],
                  colors: ["red", "blue", "green"],
                  brands: [],
                  tags: [],
                  price: 45
                  },
                  {
                  item: "Hoodie",
                  sizes: ["small", "medium", "large"],
                  colors: ["red", "blue", "green"],
                  brands: [],
                  tags: [],
                  price: 45
                  }
                  ];

    $scope.crewneck = {
                      item: "Crewneck",
                      sizes: [ {small: true}, {medium: true}, {large: true} ],
                      colors: [ {red: true}, {blue: true}, {green: true} ],
                      brands: [],
                      tags: [],
                      price: 50
                    };

  $scope.newProduct = {}

  $scope.skuGenerator = function () {
    var sku = $scope.newProduct.clientName + "-" + $scope.newProduct.designName;
    console.log("newProduct:", $scope.newProduct, "sku:", sku)
  }

  // $scope.items = [1,2,3,4,5];
  $scope.selected = [];

  $scope.checkedParent = false;

  $scope.checkedTrue = function(){
    // $scope.checkedParent = !$scope.checkedParent
    $scope.checkedParent = true;
    console.log("$scope.checkedParent:", $scope.checkedParent)
    // return true;
  };

  $scope.isParentChecked = function (e) {
    e.prevent.default()
    if ($scope.checkedParent) {
      console.log("isParentChecked?","true")
      return true;
    }
  }

  $scope.isChecked = function() {
    // return $scope.selected.length === $scope.items.length;
    !$scope.checkedParent 
    // return true
  };

} 