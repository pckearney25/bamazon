var mysql = require("mysql");
var inquirer = require("inquirer");

//GLOBAL VARIABLES
var selectedItem = "";
var selectedQuantity = 0;
var stockQuantity = 0;
var itemPrice = 0;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  displayProducts();
});

function displayProducts() {
  console.log("\nSelecting all Bamazon products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (i = 0; i < res.length; i++) {
      console.log(
        "Item Id: " +
          res[i].item_id +
          ", Item: " +
          res[i].product_name +
          ", Price: $" +
          res[i].price.toFixed(2)
      );
    }
    console.log("\n");
    itemSelection();
  });
}

function itemSelection() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Select an item for purchase: (by item_id #)",
        name: "selected_item"
      },
      {
        type: "input",
        message: "Select the number of units for purchase: ",
        name: "selected_quantity"
      }
    ])
    .then(function(response) {
      selectedItem = response.selected_item;
      selectedQuantity = parseInt(response.selected_quantity);
      console.log(
        "\nSelected item: " +
          selectedItem +
          ", Selected quantity: " +
          selectedQuantity
      );
      checkInventory();
    });
}

function checkInventory() {
  console.log("\nChecking inventory.....");
  connection.query(
    "SELECT * FROM products WHERE ?",
    { item_id: selectedItem },
    function(err, res) {
      if (err) throw err;
      stockQuantity = res[0].stock_quantity;
      itemPrice = res[0].price;
      console.log("\nThere are " + res[0].stock_quantity + " in stock.....");
      if (res[0].stock_quantity >= selectedQuantity) {
        console.log(
          "\nSufficient Quantity in stock. Let's Confirm your order!"
        );
        confirmOrder();
      } else {
        console.log("\nInsufficient quantity in stock. Sorry. :-( \n");
        connection.end();
      }
    }
  );
}

function confirmOrder() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "\nPlace order on your infinite store credit? ",
        name: "order_confirm",
        default: true
      }
    ])
    .then(function(response) {
      var total = selectedQuantity * itemPrice;
      if (response.order_confirm) {
        console.log(
          "\nYour order in the amount of $" +
            total.toFixed(2) +
            " is confirmed."
        );
        updateInventory();
      } else {
        console.log("\nMaybe another day. Please visit again.\n");
        connection.end();
      }
    });
}

function updateInventory() {
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: stockQuantity - selectedQuantity
      },
      {
        item_id: selectedItem
      }
    ],
    function(err, res) {
      console.log("\nThank you for your purchase! Please visit again.\n");
    }
  );
  connection.end();
}
