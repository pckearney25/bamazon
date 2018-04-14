DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products
(
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (item_id));
  
SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("polka dot bikini", "Swimwear", 39.99, 1000),
("swim goggles", "Swimwear", 24.37, 500),
("polo shirt", "Menswear", 45.00, 2000),
("cargo shorts", "Menswear", 33.33, 5000),
("bridal gown", "Womenswear", 2000.00, 10),
("blue blouse", "Womenswear", 65.00, 1000),
("Merlo wine glass set", "Housewares", 99.00, 335),
("Picnic sets", "Housewares", 110.00, 400),
("Leather sofa", "Furniture", 4000.00, 60),
("Cherry dining room suite", "Furniture", 9000.00, 50)
;
