DROP DATABASE IF EXISTS employee_on_command_line_db;
CREATE DATABASE employee_on_command_line_db;

-- SWITCH to employee database
USE employee_on_command_line_db;

-- CREATE department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- CREATE the role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(18,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id)
    REFERENCES department(id) 
);

-- CREATE the employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT REFERENCES employee(id), 
    FOREIGN KEY (role_id)
    REFERENCES role (id) 
);

