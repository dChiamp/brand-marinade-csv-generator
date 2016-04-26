
<div ng-controller="ColorsController as cc" class="md-padding checkboxdemoBasicUsage" ng-cloak="">
  <div>
    <fieldset class="standard">
      <legend>Using <ng-model></legend>
      <div layout="column" layout-wrap="" layout-gt-sm="row">
        <div flex-xs="" flex="50">
          <md-checkbox ng-model="data.cb1" aria-label="product" ng-checked="" ng-click="" ng-repeat="product in products">
            Product: {{ product.item }}
            <md-checkbox ng-show="isParentChecked();" aria-label="size" ng-checked="">
              Sizes: {{ product.sizes[0] }}
               <md-checkbox ng-show="data.cb1" aria-label="color" ng-checked="">
                Colors: {{ product.colors[0] }}
              </md-checkbox>
            </md-checkbox>
          </md-checkbox>

        </div>
      </div>
    </fieldset>
  </div>
</div>


<div ng-controller="TypeController as tc ">
    <div class="md-padding demo checkboxdemoSelectAll">
      <h3> Select Product Type </h3>
      <div layout="row" layout-wrap="">
        <div flex="100" layout="column">
          <div>
            <fieldset class="demo-fieldset">
              <div layout="row" layout-wrap="" flex="">
              <div flex-xs="" flex="50">
                <md-checkbox aria-label="Select All" ng-checked="isChecked()" md-indeterminate="isIndeterminate()" ng-click="toggleAll()">
                  <span ng-if="isChecked()">Un-</span>Select All Types
                </md-checkbox>
              </div>
                <div class="demo-select-all-checkboxes" flex="100" ng-repeat="item in items">
                  <md-checkbox ng-checked="exists(item, selected)" ng-click="toggle(item, selected)" >
                   {{ item.item }}
                  </md-checkbox>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>


    <div ng-controller="ColorsController as cc">
    <div class="md-padding demo checkboxdemoSelectAll">
      <h3> Select Product Type </h3>
      <div layout="row" layout-wrap="">
        <div flex="100" layout="column">
          <div>
            <fieldset class="demo-fieldset">
              <div layout="row" layout-wrap="" flex="">
                <div class="demo-select-all-checkboxes" flex="100">
                  <md-switch  ng-repeat="(key, value) in crewneck.sizes">
                    <p> {{key}}, include: {{value}} </p>
                  </md-switch>
                  <md-switch ng-model="crewneck.sizes.small">
                    <p> {{crewneck.sizes.small}} </p>
                  </md-switch>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
    {{crewneck.sizes.small}}
  </div>

    <div ng-controller="ProductsController as pc" class="md-padding checkboxdemoBasicUsage" ng-cloak="">
    <div>
      <fieldset class="standard">
        <legend> Products </legend>
        <div layout="column" layout-wrap="" layout-gt-sm="row">
          <div flex-xs="" flex="50">
            <md-checkbox ng-model="newProduct.item" aria-label="product" ng-click="checkedTrue()" ng-checked="" ng-repeat="product in products">
              Product: {{ product.item }}
              <div ng-if="checkedParent">
                <div> Sizes: 
                  <md-checkbox ng-model="newProduct.sizes" aria-label="size" ng-repeat="size in product.sizes track by $index">
                    {{ size }}
                  </md-checkbox> 
                </div>
                <div> Colors:
                  <md-checkbox ng-model="newProduct.colors" aria-label="color" ng-repeat="color in product.colors track by $index">
                  {{ color }}
                  </md-checkbox> 
                </div>
                <form ng-submit="skuGenerator()">
                  <div class="form-group"> Price:
                   <input type="text" ng-model="newProduct.price" placeholder="{{product.price}}">
                  <input type="submit" value="submit" class="btn btn-sm btn-success">&nbsp;
                  </div>
                </form>
              </div>

            </md-checkbox>
          </div>
        </div>
      </fieldset>
    </div>
    <p> test parsing: {{crewneck.sizes}}  </p>
  </div>

// products
    $scope.products = [
                {
                  item: "Crewneck",
                  colors: {red: true,
                        green: true,
                        blue: false
                      },
                  sizes: {small: false,
                        medium: true,
                        large: true
                      },
                  brands: ["American Apparel"],
                  tags: ["hella cool"],
                  price: 50
                },
                {
                  item: "Hoodie",
                  colors: {red: false,
                          green: true,
                          blue: false
                        },
                  sizes: {small: true,
                          medium: true,
                          large: true
                        },
                  brands: ["Galvins"],
                  tags: ["super sweet"],
                  price: 45
                }
              ]


// test data binding to model with ng-model= value

  <div ng-controller="HoodieController as hc">
    <p> Test Size </p>
    <div ng-repeat="(key, value) in product.colors">
      <md-switch ng-model="value"> 
          <p> {{key}} | {{value}} </p>
      </md-switch>
    </div>
    <button ng-click="save()"> save </button>
  </div>

  // working w/ hardcoded ng-model
  <div ng-controller="HoodieController as hc">
    <p> Test Size </p>
      <md-switch ng-model="product.sizes.small"> 
          small: {{product.sizes.small}}
      </md-switch>
      <button ng-click="save()"> save</button>
  </div>

// file saver

  <div class="wrapper" ng-controller="SaveController as vm">
    <a href="" class="btn btn-dark btn-small" ng-click="vm.download(vm.val.text)">
    Download </a>
  </div>
// ng-CSV
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
   // createColorSizeObj();

   // ********iterating through object to create individual colorSize products

   // console.log("product color", product.colors.red)
  function iterateThruNewProd () {
    for (prodKey in product) {
      // iterate thru prod obj, and get all prodKeys and vals
      var prodKeyVal = product[prodKey]
      // console.log("for prodKey in product:", prodKey)
      // console.log("for prodKeyVal", prodKeyVal);
      // bind each data to scope 
      if (prodKey === "item") {
        $scope.csvTemplate.item = prodKeyVal
        console.log("SCOPE ITEM", $scope.csvTemplate.item)
      }
      if (prodKey === "price") {
        $scope.csvTemplate.price = prodKeyVal
      }
      if (prodKey === "brands") {
        $scope.csvTemplate.brands = prodKeyVal
      }
      if (prodKey === "tags") {
        $scope.csvTemplate.tags = prodKeyVal
      }
      // iterate thru colors
      if (prodKey === "colors") {
        for (colorKeyName in prodKeyVal) {
          console.log("color name", colorKeyName)
          var colorBoolean = prodKeyVal[colorKeyName]
          // if color is true(selected)
          // if (prodKeyVal.red) {
            if (colorBoolean) {
            $scope.csvTemplate.color = colorKeyName;
            console.log("SCOPE.COLOR:",  $scope.csvTemplate.color)
            // console.log("COLOR" +colorKeyName+ " SLCTD")
            // iterate through all sizes
            for (sizeKeyName in product.sizes) {
              sizeBoolean = product.sizes[sizeKeyName]
              console.log("SIZE BooLEAN", sizeBoolean)
              // if size is true (selected)
              if(sizeBoolean) {
                // bind it as color.size
                console.log("sizeKeyName:", sizeKeyName)
                // need to figure out how to add size to color
                // $scope.csvTemplate.color.size = sizeKeyName;
                $scope.csvTemplate.size = sizeKeyName;
                console.log("DATa.Size", $scope.csvTemplate.size);
              }
            }
          }
          // console.log("for prodKey in COLORS:", val);
          // console.log("colorBoolean", colorBoolean )
          // if (colorBoolean == true ) {
          // if colors val = true, then iterate through sizes
            // console.log("INCLUDE THIS COLOR")
          // } else {
            // console.log("DONT INCLUDE THIS COLOR")
          // }
          // only push if size = true
        }
      }
    }
  }
  // iterateThruNewProd();

    // naive
  // iterate through product.sizes
  // if size.colors.x = true
  // push to an obj
  // then push that obj to csvTemplate.data

  // ?in template.data the field prodKey should call a fnc to iterate through

  // 1.0
  // move all of this to back end
  // only keep fields changed from dom

  // the first obj in the csvTemplate is the defualt settings,

  // then iterate through each product,
  // and push that obj with only *changed* fields to obj (not array)

  // defualt settings template in backend 
  // $scope.csvTemplate.template //arrray of objs

  // send updated changes
  // $scope.csvTemplate.updated //array
  // push the .updated array to obj

  // now i just need to figure out how to 
  // push the objects in the right order

  // 2.0 order for each prod 
  // the first obj has everything
  // the next obj only push fields that change / always full
    //selects first color, then iterates through all sizes if true
      // ALWAYS INCLUDE: handle, option1 val, size, sku, price, grams, imgsource
      // stringify prodKeyVal to insert in obj
      // call recursvely until it goes through all colors marked true

  // 3.0
  // create a series of helper functions to get right format
  // first function, bind everything to scope accords to name (scope.item)
  // second, map colors to sizes
  // 
  // maybe scope.csvTemplate.colorsize = {color: "red", size: "small"}


  // map weight to sizes //refactor it in later in backend

  // ******* iterating refactor (front end)
  function createColorSizeObj () {
    for (colorName in product.colors) {
      var colorBoolean = product.colors[colorName]
      // if color is true, iterate through sizes
      if (colorBoolean) {
        for (sizeName in product.sizes) {
          var sizeBoolean = product.sizes[sizeName]
          //if both are true, create obj and bind
            $scope.csvTemplate.colorSizeArr = []
          if(colorBoolean && sizeBoolean) {
            var colorSize = colorName + sizeName;
            console.log("COLORSiZE", colorSize)
            $scope.csvTemplate[colorSize] = {}
            $scope.csvTemplate[colorSize].color = colorName;
            $scope.csvTemplate[colorSize].size = sizeName;
          }
            $scope.csvTemplate.colorSizeArr.push($scope.csvTemplate[colorSize])
        }
      }
    }
  }