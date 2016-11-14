
// Model methods
var list = [{name:"Wooden Stick", quantity:"30"}];

function addItemToList(item) {
  list.push(item);
  console.log(list);
}

// Controller methods
function addOrder() {
  var item_name = document.getElementById("item_name").value;
  var item_quantity = document.getElementById("item_quantity").value;
  addItemToList({name:item_name, quantity:item_quantity});
  hideAddOrder();
  drawListItem();
}

// View methods

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
