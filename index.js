const inquier = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// CREATES connection to database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Welcome!");
});

// LISTS main menu choices for users, ACTIVATES their function on selected choice
async function mainMenu() {
  try {
    const { answer } = await inquier.prompt([
      {
        type: "list",
        name: "answer",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Deparments",
          "Add Department",
          "Exit",
        ],
      },
    ]);

    switch (answer) {
      case "View All Employees":
        await viewAllEmployees();
        break;
      case "Add Employee":
        await addEmployee();
        break;
      case "Update Employee Role":
        await updateRole();
        break;
      case "View All Roles":
        await viewAllRoles();
        break;
      case "Add Role":
        await addRole();
        break;
      case "View All Deparments":
        await viewAllDepartments();
        break;
      case "Add Department":
        await addDepartment();
        break;
      case "Exit":
        exit();
        break;
    }
  } catch (err) {
    console.log(err);
  }
}

// CONSOLE LOGS a table of all employees
async function viewAllEmployees() {
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT 
         employee.id, 
         CONCAT (employee.first_name, " ", employee.last_name) AS name, 
         role.title, 
         role.salary,
         CONCAT (manager.first_name, " ", manager.last_name) AS manager,
         department.name AS department 
         FROM employee 
         JOIN role ON employee.role_id = role.id
         JOIN department ON role.department_id = department.id
         LEFT JOIN employee manager ON employee.manager_id = manager.id`,
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.table(result);
    await mainMenu();
  } catch (err) {
    console.log(err);
  }
}

// ALLOWS users to add employee to DB
async function addEmployee() {
  try {
    const data = await inquier.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is your employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is your employee's last name?",
      },
      {
        type: "input",
        name: "role",
        message: "What is your employee's role id?",
      },
      {
        type: "input",
        name: "manager",
        message: "What is your employee's manager id?",
      },
    ]);

    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [data.firstName, data.lastName, data.role, data.manager],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    const result = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT 
                    employee.id, 
                    CONCAT (employee.first_name, " ", employee.last_name) AS name, 
                    role.title, 
                    role.salary,
                    CONCAT (manager.first_name, " ", manager.last_name) AS manager,
                    department.name AS department 
                    FROM employee 
                     JOIN role ON employee.role_id = role.id
                     JOIN department ON role.department_id = department.id
                     LEFT JOIN employee manager ON employee.manager_id = manager.id`,
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.table(result);
    await mainMenu();
  } catch (err) {
    console.log(err);
  }
}

// ALLOWS users to UPDATE employees role based on id number
async function updateRole() {
  try {
    const data = await inquier.prompt([
      {
        type: "input",
        name: "employee",
        message: "What is the id of the employee you wish to update?",
      },
      {
        type: "input",
        name: "role",
        message: "What is the id of the new role you wish to assign this employee",
      },
    ]);

    await new Promise((resolve, reject) => {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [data.role, data.employee],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    const result = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT 
         employee.id, 
        CONCAT (employee.first_name, " ", employee.last_name) AS name, 
        role.title, 
        role.salary,
        CONCAT (manager.first_name, " ", manager.last_name) AS manager,
        department.name AS department 
        FROM employee 
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`,
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.table(result);
    await mainMenu();
  } catch (err) {
    console.log(err);
  }
}

// CONSOLE LOGS a table of all current roles
async function viewAllRoles() {
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id",
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.table(result);
    await mainMenu();
  } catch (err) {
    console.log(err);
  }
}

// CREATES a new role and allows user to assign the role to a specific department
async function addRole() {
  try {
    const data = await inquier.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of your new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is this role's annual salary?",
      },
      {
        type: "input",
        name: "deptId",
        message: "What is this role's department id?",
      },
    ]);

    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);",
        [data.title, data.salary, data.deptId],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    const result = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT 
        role.id, 
        role.title, 
        role.salary, 
        department.name AS department 
        FROM role 
        JOIN department 
        ON role.department_id = department.id`,
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.table(result);
    await mainMenu();
  } catch (err) {
    console.log(err);
  }
}

// CONSOLE LOGS a table of all current departments
async function viewAllDepartments() {
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM department", function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    console.table(result);
    await mainMenu();
  } catch (err) {
    console.log(err);
  }
}

// ALLOWS users to create new department
async function addDepartment() {
  try {
    const data = await inquier.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your new department?",
      },
    ]);

    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [data.name],
        function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    const result = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM department", function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    console.table(result);
    await mainMenu();
  } catch (err) {
    console.log(err);
  }
}

// ENDS the program, SENDS message
function exit() {
  console.log("Goodbye!");
  process.exit();
}

mainMenu();
