
/***** Model methods *****/

// Warehouse list.
// This list is updated when an element is
// ordered and added.
var list = [{name:"Wooden Stick", quantity:"30"}];

// Check if an item is already inside the list
function isPresent(item) {
  for (var i=0; i<list.length; i++) {
    if (list[i].name === item.name) {
      return i;
    }
  }
  return -1;
}

// Add an item to the list and, if present,
// update his previous quantity with the new one.
function addItemToList(item) {
  var i = isPresent(item)
  if(i != -1) {
    list[i].quantity = item.quantity
  } else {
    console.log(list);
    list.push(item);
  }

}
/********************/

/***** Controller methods *****/

// Add a new order inside the list, when the 'add'
// button is pressed.
function addOrder() {
  var item_name = document.getElementById("item_name").value;
  var item_quantity = document.getElementById("item_quantity").value;
  addItemToList({name:item_name, quantity:item_quantity});
  hideAddOrder();
  drawListItem();
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
