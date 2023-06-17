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

DELIMITER //

-- UDATE employee managers
CREATE PROCEDURE update_employee_manager(
    IN employee_id INT,
    IN new_manager_id INT
)
BEGIN
    UPDATE employee
    SET manager_id = new_manager_id
    WHERE id = employee_id;
END //

-- VIEW employees by manager
CREATE PROCEDURE view_employees_by_manager(
    IN manager_id INT
)
BEGIN
    SELECT *
    FROM employee
    WHERE manager_id = manager_id;
END //

-- VIEW employees by department
CREATE PROCEDURE view_employees_by_department(
    IN department_id INT
)
BEGIN
    SELECT *
    FROM employee
    WHERE role_id IN (
        SELECT id
        FROM role
        WHERE department_id = department_id
    );
END //

-- DELETE departments, roles, and employees
CREATE PROCEDURE delete_department(
    IN department_id INT
)
BEGIN
    DELETE FROM department
    WHERE id = department_id;
END //

CREATE PROCEDURE delete_role(
    IN role_id INT
)
BEGIN
    DELETE FROM role
    WHERE id = role_id;
END //

CREATE PROCEDURE delete_employee(
    IN employee_id INT
)
BEGIN
    DELETE FROM employee
    WHERE id = employee_id;
END //

-- View the total utilized budget of a department
CREATE PROCEDURE view_department_budget(
    IN department_id INT,
    OUT total_budget DECIMAL(18,2)
)
BEGIN
    SELECT SUM(salary) INTO total_budget
    FROM role
    WHERE department_id = department_id;
END //

DELIMITER ;
