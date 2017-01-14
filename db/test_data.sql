INSERT INTO manufacturer (manufacturername, idcountryman) VALUES 
('Nandos',202);
INSERT INTO factory (factoryname) VALUES 
('Nandos SA'),
('Nandos SA2');
INSERT INTO manufacturer_factory (idfactory, idmanufacturer) VALUES 
(1,1),
(2,1);
INSERT INTO address (street, city, state, country, zip) VALUES 
('10A Victoria Rd', 38049, 3240, 202, '2094');
INSERT INTO factory_address (idfactory, idaddress) VALUES 
(1,1),
(2,1);
INSERT INTO products (productname,barcode,idmanufacturer) VALUES 
("Nandos Peri-Peri Mild Sauce", 6003770003091, 1), 
("Nandos Peri-Peri Extra Mild Sauce", 6003770002414, 1);
INSERT INTO users (usersname, email, passwd) VALUES 
("Ecotiny", "linus@molteno.net", "yegods");
INSERT INTO contribution_type (contriname) VALUES 
("POST");
INSERT INTO product_contributor (idproducts, idusers, contribution_type) VALUES 
(1,1,1),
(2,1,1);
INSERT INTO categories (name) VALUES 
("Sauce");
INSERT INTO product_category (idproductcat, idcategory) VALUES
(1, 1),
(2, 1);
INSERT INTO product_factory (idproduct, idfactory) VALUES
(1, 1),
(2, 1);
