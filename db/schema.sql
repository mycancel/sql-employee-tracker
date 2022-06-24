-- Drops the company_db if it exists currently --
DROP DATABASE IF EXISTS company_db;
-- Creates the company_db database --
CREATE DATABASE company_db;

-- Use company_db database --
USE company_db;
 
-- Creates the table "department" within company_db --
CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Creates the table "role" within company_db --
CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);

-- Creates the table "employee" within company_db --
CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);