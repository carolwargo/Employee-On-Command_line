# Employee-On-Command_line

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Employee-On-Command-line is a Command-line **content management system (CMS)**, built using Node.js, Inquirer, and MySQL- A CMS is an interface that allows non-developers to easily view and interact with information stored in their database. 

## Table of Contents

-[Description](#description)
-[User Story](#user-story)
-[Installatiion](#installation)
-[Usage](#usage)
-[License](#license)
-[Questions](#questions)

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business.
```
## Installation

 `npm i inquirer@8.2.4 dotenv mysql2`,
 `node index.js`

## Usage

START the application: type 'node index.js' in the command-line,

The following 'MAIN MENU' options will appear: 
* view all departments, 
* view all roles, 
* view all employees,
* add a department, 
* add a role,
* add an employee, and 
* update an employee role

* "view all..." (will display the selected in a formatted table)
    * * `department`(department names and department ids),
    * * `roles`(job title, role id, department the role belongs to and salary per role),
    * * `employees`(id, first/last names, titles, departments, salaries, employee manager).

* "add a(n)..." 
    * * enter `department` to add a new department,
    * * enter `role` to add a new role,
    * * enter `employee` to add a new employee

* "update an employee role" 
    * * select the `employee` you would like to update, and enter new "employee role"

## License

![license] (https://github.com/carolwargo/Employee-On-Command_line/blob/aa90bb07e7b9f6c91926398eb63ec5d534d41f3e/LICENSE)

## Questions

![image](https://user-images.githubusercontent.com/84477950/243474429-ab5f177d-0f73-41ba-b9ec-22e05087cec8.png) 

Carol Wargo- 

"Mom of 2 men & 1 boy- Living the dream, with my glass half full." 

https://github.com/carolwargo