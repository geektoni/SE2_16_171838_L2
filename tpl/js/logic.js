
/***** Model methods *****/

// Warehouse list.
// This list is updated when an element is
// ordered and added.
var list = [];
var MAX_ITEMS = 30;
var TOTAL_ITEMS = 0;

// Check if an item is valid
function isValid(item) {
  if (item.quantity <= 0) return false;
  if (item.name === "") return false;
  return true;
}

// Check if an item is already inside the list
function isPresent(item) {
  for (var i=0; i<list.length; i++) {
    if (list[i].name === item.name) {
      return i;
    }
  }
  return -1;
}

function tooMuchItems(){
  if (MAX_ITEMS <= TOTAL_ITEMS) {
    return true;
  }
  return false;
}

function updateMaxItems(items) {
  MAX_ITEMS = items;
}

function updateTotalItems() {
  TOTAL_ITEMS = 0;
  for (var i=0; i<list.length; i++) {
      TOTAL_ITEMS += list[i].quantity;
  }
}

// Add an item to the list and, if present,
// update his previous quantity with the new one.
function addItemToList(item) {

  if (isValid(item)) {
    var i = isPresent(item)
    if(i != -1) {
      list[i].quantity = item.quantity
    } else {
      list.push(item);
    }
  } else {
    alert("The item requested is not valid!");
  }

}
/********************/

/***** Controller methods *****/

// Add a new order inside the list, when the 'add'
// button is pressed.
function addOrder() {
  var item_name = document.getElementById("item_name").value;
  var item_quantity = parseInt(document.getElementById("item_quantity").value);
  addItemToList({name:item_name, quantity:item_quantity});
  if (tooMuchItems) {alert("Warehouse limit reached!")};
  updateTotalItems();
  hideAddOrder();
  drawListItem();
}

function updateItemsLimit() {
  var number = parseInt(document.getElementById("max_items").value);
  updateMaxItems(number);
  if (tooMuchItems()) {alert("Warehouse limit reached!")};
}

function openAddOrder() {
  if (tooMuchItems()) {
    alert("Warehouse limit reached!");
  }
  displayAddOrder();
}

/*******************/

/***** View methods *****/

// Draw the table with the item list
function drawListItem() {

  var child = document.getElementById("item_table");
  if (child != null) {
    document.getElementById("body").removeChild(child);
  }

  var table = document.createElement("table");
  table.setAttribute("id", "item_table")
  var header_1 = document.createElement("th");
  header_1.appendChild(document.createTextNode("Item Name"));
  var header_2 = document.createElement("th");
  header_2.appendChild(document.createTextNode("Quantity"));
  table.appendChild(header_1);
  table.appendChild(header_2);

  for (var i=0; i<list.length; i++) {
    var item = list[i]
    var line = document.createElement("tr");
    var item_name = document.createElement("td");
    item_name.appendChild(document.createTextNode(item.name));
    var item_quantity = document.createElement("td");
    item_quantity.appendChild(document.createTextNode(item.quantity));
    line.appendChild(item_name);
    line.appendChild(item_quantity);
    table.appendChild(line);
  }
  var button = document.getElementById("new_item");
  document.getElementById("body").insertBefore(table, button);
}

// Hide the input to add a new item
function hideAddOrder() {
  document.getElementById("order_item").disabled=false;
  document.getElementById("new_item").style.visibility="hidden";
}

// Display the input fields to add a new item
function displayAddOrder() {
  document.getElementById("order_item").disabled=true;
  document.getElementById("new_item").style.visibility="visible";
}

/*******************/
