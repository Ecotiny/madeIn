
-- -----------------------------------------------------
-- Table Country
-- -----------------------------------------------------
DROP TABLE IF EXISTS Country ;

CREATE TABLE IF NOT EXISTS Country (
  id SERIAL,
  name TEXT NULL,
  PRIMARY KEY (id))
;


-- -----------------------------------------------------
-- Table manufacturer
-- -----------------------------------------------------
DROP TABLE IF EXISTS manufacturer ;

CREATE TABLE IF NOT EXISTS manufacturer (
  id SERIAL,
  name TEXT NULL,
  PRIMARY KEY (id))
;

CREATE UNIQUE INDEX idmanufacturer_UNIQUE ON manufacturer (id ASC);


-- -----------------------------------------------------
-- Table products
-- -----------------------------------------------------
DROP TABLE IF EXISTS products ;

CREATE TABLE IF NOT EXISTS products (
  id SERIAL,
  Name TEXT NULL,
  barcode INT NULL,
  idman INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_products_manufacturer1
    FOREIGN KEY (idman)
    REFERENCES manufacturer (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE UNIQUE INDEX id_UNIQUE ON products (id ASC);

CREATE INDEX fk_products_man_idx ON products (idman ASC);


-- -----------------------------------------------------
-- Table city
-- -----------------------------------------------------
DROP TABLE IF EXISTS city ;

CREATE TABLE IF NOT EXISTS city (
  id SERIAL,
  name TEXT NULL,
  PRIMARY KEY (id))
;


-- -----------------------------------------------------
-- Table factory
-- -----------------------------------------------------
DROP TABLE IF EXISTS factory ;

CREATE TABLE IF NOT EXISTS factory (
  id SERIAL,
  name TEXT NULL,
  PRIMARY KEY (id))
;

CREATE UNIQUE INDEX idfactory_UNIQUE ON factory (id ASC);


-- -----------------------------------------------------
-- Table state
-- -----------------------------------------------------
DROP TABLE IF EXISTS state ;

CREATE TABLE IF NOT EXISTS state (
  id SERIAL,
  name VARCHAR(255) NULL,
  PRIMARY KEY (id))
;


-- -----------------------------------------------------
-- Table address
-- -----------------------------------------------------
DROP TABLE IF EXISTS address ;

CREATE TABLE IF NOT EXISTS address (
  id SERIAL,
  street VARCHAR(255) NULL,
  city INT NULL,
  state INT NULL,
  country INT NULL,
  zip VARCHAR(45) NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_address_city1
    FOREIGN KEY (city)
    REFERENCES city (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_address_Country1
    FOREIGN KEY (country)
    REFERENCES Country (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_address_state1
    FOREIGN KEY (state)
    REFERENCES state (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX fk_address_city1_idx ON address (city ASC);

CREATE INDEX fk_address_Country1_idx ON address (country ASC);

CREATE INDEX fk_address_state1_idx ON address (state ASC);

CREATE UNIQUE INDEX iduser_UNIQUE ON address (id ASC);


-- -----------------------------------------------------
-- Table manufacturer_factory
-- -----------------------------------------------------
DROP TABLE IF EXISTS manufacturer_factory ;

CREATE TABLE IF NOT EXISTS manufacturer_factory (
  idmanufacturer INT NULL,
  idfactory INT NULL,
  CONSTRAINT fk_manufacturer_factory_manufacturer1
    FOREIGN KEY (idmanufacturer)
    REFERENCES manufacturer (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_manufacturer_factory_factory1
    FOREIGN KEY (idfactory)
    REFERENCES factory (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX fk_manufacturer_factory_manufacturer1_idx ON manufacturer_factory (idmanufacturer ASC);

CREATE INDEX fk_manufacturer_factory_factory1_idx ON manufacturer_factory (idfactory ASC);


-- -----------------------------------------------------
-- Table factory_address
-- -----------------------------------------------------
DROP TABLE IF EXISTS factory_address ;

CREATE TABLE IF NOT EXISTS factory_address (
  idfactory INT NULL,
  idaddress INT NULL,
  CONSTRAINT fk_factory_address_factory1
    FOREIGN KEY (idfactory)
    REFERENCES factory (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_factory_address_address1
    FOREIGN KEY (idaddress)
    REFERENCES address (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX fk_factory_address_factory1_idx ON factory_address (idfactory ASC);

CREATE INDEX fk_factory_address_address1_idx ON factory_address (idaddress ASC);


-- -----------------------------------------------------
-- Table contributor
-- -----------------------------------------------------
DROP TABLE IF EXISTS contributor ;

CREATE TABLE IF NOT EXISTS contributor (
  id SERIAL,
  username varchar(16) NULL,
  email varchar(255) NULL,
  password varchar(32) NULL,
  create_time  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  products_contributed INT NULL,
  PRIMARY KEY (id));

CREATE UNIQUE INDEX idcontributor_UNIQUE ON contributor (id ASC);


-- -----------------------------------------------------
-- Table contribution_type
-- -----------------------------------------------------
DROP TABLE IF EXISTS contribution_type ;

CREATE TABLE IF NOT EXISTS contribution_type (
  idcontribution INT NOT NULL,
  name VARCHAR(45) NULL,
  PRIMARY KEY (idcontribution))
;


-- -----------------------------------------------------
-- Table product_contributor
-- -----------------------------------------------------
DROP TABLE IF EXISTS product_contributor ;

CREATE TABLE IF NOT EXISTS product_contributor (
  idproducts INT NULL,
  iduser INT NULL,
  contribution_type INT NULL,
  CONSTRAINT fk_product_contributor_user1
    FOREIGN KEY (iduser)
    REFERENCES contributor (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_product_contributor_products1
    FOREIGN KEY (idproducts)
    REFERENCES products (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_product_contributor_contribution_type1
    FOREIGN KEY (contribution_type)
    REFERENCES contribution_type (idcontribution)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX fk_product_contributor_user1_idx ON product_contributor (iduser ASC);

CREATE INDEX fk_product_contributor_products1_idx ON product_contributor (idproducts ASC);

CREATE INDEX fk_product_contributor_contribution_type1_idx ON product_contributor (contribution_type ASC);


-- -----------------------------------------------------
-- Table manufacturer_contributor
-- -----------------------------------------------------
DROP TABLE IF EXISTS manufacturer_contributor ;

CREATE TABLE IF NOT EXISTS manufacturer_contributor (
  idmanufacturer INT NULL,
  contribution_type INT NULL,
  iduser INT NULL,
  CONSTRAINT fk_manufacturer_contributor_contribution_type1
    FOREIGN KEY (contribution_type)
    REFERENCES contribution_type (idcontribution)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_manufacturer_contributor_manufacturer1
    FOREIGN KEY (idmanufacturer)
    REFERENCES manufacturer (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_manufacturer_contributor_user1
    FOREIGN KEY (iduser)
    REFERENCES contributor (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX fk_manufacturer_contributor_contribution_type1_idx ON manufacturer_contributor (contribution_type ASC);

CREATE INDEX fk_manufacturer_contributor_manufacturer1_idx ON manufacturer_contributor (idmanufacturer ASC);

CREATE INDEX fk_manufacturer_contributor_user1_idx ON manufacturer_contributor (iduser ASC);


   
