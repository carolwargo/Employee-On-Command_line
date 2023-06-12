-- CREATE the employee database
CREATE DATABASE employee_on_command_line_db;

-- Switch to the employee-on-command_line database
USE employee_on_command_line;

-- SWITCH to employee database
USE employee_on_command_line_db;

-- CREATE department table
CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30)
);

-- CREATE the role table
CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- CREATE the employee table
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
    

