const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();
const cTable = require("console.table");

console.log(process.env.HOST);
console.log(process.env.USER);
console.log(process.env.PASSWORD);
console.log(process.env.DATABASE);

// CREATE connection to database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// CONNECT to the database
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the database!");
  mainMenu();
});

// HANDLE errors during the connecion
connection.on("error", (error) => {
  console.error("Database connection error:", error);
});

// LISTS main menu choices, ACTIVATES selected choice
async function mainMenu() {
  try {
    const { answer } = await inquirer.prompt([
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
        viewAllEmployees();
        break;
      case "Add Employee":
        await addEmployee();
        break;
      case "Update Employee Role":
        await updateRole();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "Add Role":
        await addRole();
        break;
      case "View All Deparments":
        viewAllDepartments();
        break;
      case "Add Department":
        await addDepartment();
        break;
      case "Exit":
        exit();
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

// CONSOLE TABLE employees
function viewAllEmployees() {
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
        console.log(err);
      }
      console.table(result);
      mainMenu();
    }
  );
}

// ADD employee to database
//ADDED async to addEmployee function
async function addEmployee() {
  try {
    const data = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is your employees first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is your employees last name?",
      },
      {
        type: "input",
        name: "role",
        message: "What is your employess role id?",
      },
      {
        type: "input",
        name: "manager",
        message: "what is your employees manager id?",
      },
    ]);
    connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
      [data.firstName, data.lastName, data.role, data.manager],
      function (err, result) {
        if (err) throw err;
      }
    );
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
        console.table(result);
        mainMenu();
      }
    );
  } catch (error) {
    console.lot(error);
    mainMenu();
  }
}

// UPDATE employees role by id
// ADDED async to updateRole function
async function updateRole() {
  try {
    const data = await inquirer.prompt([
      {
        type: "input",
        name: "employee",
        message: "What is the id of the employee you wish to update?",
      },
      {
        type: "input",
        name: "role",
        message:
          "What is the id of the new role you wish to assign this employee",
      },
    ]);

    connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [data.role, data.employee],
      function (err, result) {
        if (err) throw err;
      }
    );
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
        if (err) throw err;
        console.table(result);
        mainMenu();
      }
    );
  } catch (error) {
    console.log(error);
    mainMenu();
  }
}

// CONSOLE LOG TABLE roles
function viewAllRoles() {
  connection.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id",
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.table(result);
      mainMenu();
    }
  );
}

// CREATES role and ALLOWS user to assign role to department
// ADDED async to addRole function
async function addRole() {
  try {
    const data = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of your new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is this roles annual salary?",
      },
      {
        type: "input",
        name: "deptId",
        message: "What is this roles department id?",
      },
    ]);

    connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);",
      [data.title, data.salary, data.deptId],
      function (err, result) {
        if (err) throw err;
      }
    );
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
        if (err) throw err;
        console.table(result);
        mainMenu();
      }
    );
  } catch (error) {
    console.log(error);
    mainMenu();
  }
}

// CONSOLE LOGS TABLE departments
function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) {
      console.log(err);
      return mainMenu();
    }
    console.table(result);
    mainMenu();
  });
}

// CREATE new department
// ADDED async to addDepartment function
async function addDepartment() {
  try {
    const data = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your new department?",
      },
    ]);
    connection.query(
      "INSERT INTO department (name) VALUES (?)",
      [data.name],
      function (err, result) {
        if (err) throw err;
      }
    );

    connection.query("SELECT * FROM department", function (err, result) {
      if (err) throw err;
      console.table(result);
      mainMenu();
    });
  } catch (error) {
    console.lot(error);
    mainMenu();
  }
}

// END QUIT
function exit() {
  console.log("Goodbye!");
  process.exit();
}

mainMenu();
