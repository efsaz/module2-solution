(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list_buy = this;
  // List of shopping items
  list_buy.items = ShoppingListCheckOffService.getItemsToBuy();

  // list.itemName = "";
  // list.itemQuantity = "";
  //
  // list.addItem = function () {
  //   try {
  //     ShoppingList.addItem(list.itemName, list.itemQuantity);
  //   } catch (error) {
  //     list.errorMessage = error.message;
  //   }
  // };
  list_buy.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItemToBuy(itemIndex);
    if(list_buy.items.length==0)
      list_buy.errorMessage = "Everything is bought!";
    else
      list_buy.errorMessage = null;
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list_bought = this;

  list_bought.items = ShoppingListCheckOffService.getItemsBought();
  list_bought.errorMessage = "Nothing bought yet.";

  // showList.removeItem = function (itemIndex) {
  //   ShoppingListCheckOffService.removeItem(itemIndex);
  // };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [{ name: "bananas", quantity: 100 }, { name: "apples", quantity: 21 },
                { name: "cookies", quantity: 10 }, { name: "oranges", quantity: 20 },
                  { name: "pineapples", quantity: 30 }];

  var itemsBought = [];

  // service.addItemBought = function (itemName, quantity) {
  //   var item = {
  //     name: itemName,
  //     quantity: quantity
  //   };
  //   itemsBought.push(item);
  // };

  service.removeItemToBuy = function (itemIdex) {
    var item =itemsToBuy[itemIdex]
    itemsToBuy.splice(itemIdex, 1);
    itemsBought.push(item);
  };

  service.getItemsBought = function () {
    return itemsBought;
  };
  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
}

})();
