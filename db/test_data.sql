INSERT INTO manufacturer (manufacturername, idcountryman) VALUES ('Nandos',202);
INSERT INTO factory (factoryname) VALUES ('Nandos SA');
INSERT INTO manufacturer_factory (idfactory, idmanufacturer) VALUES (1,1);
INSERT INTO address (street, city, state, country, zip) VALUES ('10A Victoria Rd', 38049, 3240, 202, '2094');
INSERT INTO factory_address (idfactory, idaddress) VALUES (1,1);
INSERT INTO products (name,barcode,idmanufacturer) VALUES ("Nandos Peri-Peri Mild Sauce", 6003770003091, 1);
INSERT INTO factory (factoryname) VALUES ('Nandos SA2');
INSERT INTO manufacturer_factory (idfactory, idmanufacturer) VALUES (2,1);
INSERT INTO address (street, city, state, country, zip) VALUES ('10A Victoria Rd', 38049, 3240, 202, '2094');
INSERT INTO factory_address (idfactory, idaddress) VALUES (2,1);
INSERT INTO products (name,barcode,idmanufacturer) VALUES ("Nandos Peri-Peri Extra Mild Sauce", 6003770002414, 1);

