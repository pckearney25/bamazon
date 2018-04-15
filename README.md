# bamazon

A node application accessing a MySQL database.

## Overview

In this repository we've created a simple Amazon-like storefront. The app accesses a MySQL database entitled `bamazon`. This database contains information within a single table entitled `products` with the following field columns:

* item_id (a unique id for each product)
* product_name (name of product)
* department_name (the department within which it is sold at bamazon)
* price (cost to customer)
* stock_quantity (how much of the product is available in stores)

This information is accessed and modified via two Node applications:

* `bamazonCustomer.js` - to enable a customer to "shop" for porducuts. Upon opening application:
  * All available items for sale are displayed.
  * The user is then prompted to enter the item_id and quantity of a particular product they would like to buy
  * The application checks the inventory to determine if enough stock is on hand to fill the order.
  * The user is notified if there is insufficient quantity.
  * If there is sufficient quantity, the user is asked if they would like to complete the purchase and is subsequently shown the total cost of the purchase.
  * The database is then updated to reflect the remaining quantity.

Screen shots of both the sufficient (https://d.pr/iFzR1j) and insufficient (https://d.pr/bCWX2f) quantity shopping experience can be found in the Droplr board entitled `bamazonCustomer`, which can be found at https://d.pr/boards/5ad27b602708520020961e4a.

* `bamazonManager.js` - to enable a manager to add products and view and modify inventory. Upon opening the application:

  * The user is asked to choose between four operations.

    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product

  * In the "View Products for Sale" operation, every available item is displayed (item_id, product_name, price, and stock_quantity).

  * In the "View Low Inventory "operation all items with an inventory of < 5 units is displayed.

  * The "Add to Inventory" operation allows the user enter a user-defined number of units to add to any specified item in the store.

  * The "Add New Product" operation enables the user to add a new item to the store (and prompts the user for the required information).

Screen shots of the bamazon manager experience can be found in the Dropler board entitled `bamazonManager` at https://d.pr/boards/5ad27c49d1115b00204710c1. There are four screen shots. The operation selections can be seen at https://d.pr/ANXmak. The Views of both products for sale and low inventory operations are seen in https://d.pr/tpbt89. An example of addition to inventory is seen in https://d.pr/Lw8rIn (sandwiched between displays of the products for sale both before and after the operation). An example of new product addition is seen in https://d.pr/YzNCQ0 (sandwiched between displays of the products for sale both before and after the operation).

## Installation

Upon downloading the repo, anyone wishing to run the applications will need to install the npm node, mysql, and inquirer packages, and perform an approriate "npm init -y" operation to build the appropriate package and package-lock JSON files. These packages can be obtaind at https://www.npmjs.com/. A `bamazon.sql` file is provided to enable the user to construct the `bamazon` MySQL database, and it contains the code for a sample of 10 storeproducts. HAVE FUN!

## Authors

All code displayed here was written by Patrick Kearney

## Built With

* JavaScript
* Node.js
* The NPM package manager for the inquirer and mysql packages.
* MySql Workbench was used to simplify database creation.

## Licence

This project is licensed under the MIT License.

## Acknowledgments

This application was constructed as part of the University of Kansas Full-Stack Web-Development Coding Bootcamp Program offered in conjuction with Trinity Educational Services. Thanks to these institutions for providing the inital project requirements.
