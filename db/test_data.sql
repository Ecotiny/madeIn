INSERT INTO state (name, idcountry) VALUES ('Gaunteng', 197);
INSERT INTO city (name, stateid) VALUES ('Johannesburg', 1);
INSERT INTO manufacturer (name, idcountryman) VALUES ('Nandos',1);
INSERT INTO factory (name) VALUES ('Nandos SA');
INSERT INTO manufacturer_factory (idfactory, idmanufacturer) VALUES (1,1);
INSERT INTO address (street, city, state, country, zip) VALUES ('10A Victoria Rd', 1, 1, 1, '2094');
INSERT INTO factory_address (idfactory, idaddress) VALUES (1,1);
INSERT INTO products (name,barcode,idmanufacturer) VALUES ("Nandos Peri-Peri Mild Sauce", 6003770003091, 1);
