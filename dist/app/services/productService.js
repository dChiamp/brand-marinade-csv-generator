app.service('productService', productService)

// productService.$inject = ['$rootScope'];

function productService ($rootScope) {
  var self = this;

  self.saveProductSettings = saveProductSettings;

  function saveProductSettings() {
    console.log("test");
  }
  // return productService;

  $rootScope.checkedParent = false;
  $rootScope.isChecked = false

  $rootScope.checkedTrue = function(){
    // $rootScope.checkedParent = !$rootScope.checkedParent
    // $rootScope.checkedParent = true;
    $rootScope.isChecked = !$rootScope.isChecked
    console.log("$rootScope.checkedParent:", $rootScope.checkedParent)
    // return true;
  };

  $rootScope.checkedFalse = function(){
    // $rootScope.checkedParent = !$rootScope.checkedParent
    // $rootScope.checkedParent = true;
    $rootScope.isChecked = false;
    console.log("$rootScope.checkedParent:", $rootScope.checkedParent)
    // return true;
  };

  $rootScope.isParentChecked = function (e) {
    e.prevent.default()
    if ($rootScope.checkedParent) {
      console.log("isParentChecked?","true")
      return true;
    }
  }

};
