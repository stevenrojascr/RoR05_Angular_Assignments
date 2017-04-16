(function() {
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive("foundItems", FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
  templateUrl: 'menuList.html',
  scope: {
    found: '<',
    onRemove: '&'
  },
  controller: NarrowItDownController,
  controllerAs: 'narrow',
  bindToController: true
  };
  return ddo;
}

NarrowItDownController.$inject= ["MenuSearchService"];
function NarrowItDownController (MenuSearchService){
  var narrow = this;

  narrow.searchTerm = "";
  narrow.found = [];

  narrow.search = function () {
    var term = narrow.searchTerm.toLowerCase();
    MenuSearchService.getMatchedMenuItems(term).then(function(found){
      narrow.found = found;
    });
  }

  narrow.removeItem = function (indexItem) {
    narrow.found.splice(indexItem,1);
  }
}

MenuSearchService.$inject=["$http","ApiBasePath"];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems= function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "//menu_items.json")
    }).then(function (result) {
    // process result and only keep items that match
    var foundItems = [];
    var menuItems = result.data.menu_items;
    for (var i = 0; i < menuItems.length; i++) {
      var description = menuItems[i].description;
      if (description.toLowerCase().indexOf(searchTerm) !== -1){
        // add to foundItems
        foundItems.push(menuItems[i]);
      }
    }
    // return processed items
    return foundItems;
  });
  }
}

})();
