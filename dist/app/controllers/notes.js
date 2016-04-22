
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
