const inquier = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// CREATES connection to database
const connection = mysql.createConnection(
  {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  console.log("Welcome!")
);

// LISTS main menu choices, ACTIVATES selected choice
async function mainMenu() {
  inquier
    .prompt([
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
    ])
    .then(({ answer }) => {
      switch (answer) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Deparments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Exit":
          exit();
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
function addEmployee() {
  inquier
    .prompt([
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
    ])
    .then((data) => {
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
    });
}

// UPDATE employees role by id 
function updateRole() {
  inquier
    .prompt([
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
    ])
    .then((data) => {
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
    });
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
function addRole() {
  inquier
    .prompt([
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
    ])
    .then((data) => {
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
    });
}

// CONSOLE LOGS TABLE departments
function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
    mainMenu();
  });
}

// CREATE new department
function addDepartment() {
  inquier
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your new department?",
      },
    ])
    .then((data) => {
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
    });
}

// END QUIT
function exit() {
  console.log("Goodbye!");
  process.exit();
}

mainMenu();
