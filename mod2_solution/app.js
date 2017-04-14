(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])

.controller('ToBuyController', ToBuyController )
.controller('AlreadyBoughtController', AlreadyBoughtController )
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buy = this;
  buy.List1 = ShoppingListCheckOffService.getToBuyList();

  buy.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };

  buy.buyListEmpty = function() {
    return buy.List1.length === 0;
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.List2 = ShoppingListCheckOffService.getBoughtList();

  bought.boughtListEmpty = function() {
    return bought.List2.length === 0;
  };

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of items
  var toBuyItems = [
    { name: "Cookies", quantity: 2 },
    { name: "Milk", quantity: 2 },
    { name: "Patatoes", quantity: 5 },
    { name: "Orange Juice", quantity: 1 },
    { name: "Bread", quantity: 1 }
  ];
  var boughtItems = [];

  service.getToBuyList = function() {
    return toBuyItems
  }

  service.getBoughtList = function() {
    return boughtItems
  }

  service.buyItem = function (itemIndex) {
    boughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex,1);
  };

}

})();
