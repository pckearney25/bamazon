var mysql = require("mysql");
var inquirer = require("inquirer");

//Global variables for adding to inventory
var addQuantity = 0;
var currentInv = 0;
var invId = 0;

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
  manageInventory();
});

function manageInventory() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "\nSelect a database function: ",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ],
        name: "dbAction"
      }
    ])
    .then(function(response) {
      console.log("\nYour response was : " + response.dbAction);

      switch (response.dbAction) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          viewLowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addNewProduct();
          break;
      }
    });
}

function viewProducts() {
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
          res[i].price.toFixed(2) +
          ", Stock Quantities: " +
          res[i].stock_quantity
      );
    }
    console.log("\n");
    connection.end();
  });
}

function viewLowInventory() {
  console.log("\nSelecting all Bamazon products...\n");
  connection.query("SELECT * FROM products HAVING stock_quantity < 5", function(
    err,
    res
  ) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (i = 0; i < res.length; i++) {
      console.log(
        "Item Id: " +
          res[i].item_id +
          ", Item: " +
          res[i].product_name +
          ", Price: $" +
          res[i].price.toFixed(2) +
          ", Stock Quantities: " +
          res[i].stock_quantity
      );
    }
    console.log("\n");
    connection.end();
  });
}

function addInventory() {
  console.log("\nLet's update some inventroy! \n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Select the item_id of the product to update: ",
        name: "item_id"
      },
      {
        type: "input",
        message: "Quantity to add: ",
        name: "add_quantity"
      }
    ])
    .then(function(response) {
      invId = response.item_id;
      addQuantity = parseInt(response.add_quantity);
      getItemInventory();
    });
}

function getItemInventory() {
  var query = connection.query(
    "SELECT stock_quantity FROM products WHERE ?",
    { item_id: invId },
    function(err, res) {
      currentInv = res[0].stock_quantity;
      updateItemInv();
    }
  );
}

function updateItemInv() {
  console.log("\nUpdating item quantity.....");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: currentInv + addQuantity
      },
      {
        item_id: invId
      }
    ],
    function(err, res) {
      console.log("\n" + res.affectedRows + " products updated!\n");
      connection.end();
    }
  );
}

function addNewProduct() {
  console.log("\nLet's add a new Product...\n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Name of product: ",
        name: "product_name"
      },
      {
        type: "input",
        message: "Department for product: ",
        name: "department_name"
      },
      {
        type: "input",
        message: "Price of product: ",
        name: "price"
      },
      {
        type: "input",
        message: "Stock Qunatity to Add: ",
        name: "stock_quantity"
      }
    ])
    .then(function(response) {
      var query = connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: response.product_name,
          department_name: response.department_name,
          price: response.price,
          stock_quantity: response.stock_quantity
        },
        function(err, res) {
          console.log("\n" + res.affectedRows + " products updated!\n");
        }
      );
      connection.end();
    });
}
