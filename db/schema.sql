-- CREATE the employee database
CREATE DATABASE employee_db;

-- SWITCH to employee database
USE employee_db;

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

-- ADD additional function to update employee managers
CREATE FUNCTION update_employee_manager(employee_id INT, manager_id INT)
RETURNS VOID
BEGIN
    UPDATE employee
    SET manager_id = manager_id
    WHERE id = employee_id;
END;

-- ADD additional function to view employees by manager
CREATE FUNCTION get_employees_by_manager(manager_id INT)
RETURNS TABLE (id INT, first_name VARCHAR(30), last_name VARCHAR(30))
BEGIN
    RETURN QUERY
    SELECT id, first_name, last_name
    FROM employee
    WHERE manager_id = manager_id;
END;

