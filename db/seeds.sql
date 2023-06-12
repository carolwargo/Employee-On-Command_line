INSERT INTO department (id, name)
VALUES (1, "Managment"),
       (2, "Human Resources"),
       (3, "Accounting"),
       (4, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "General Manager", 120000.00, 1),
       (2, "Assistant Manager", 100000.00, 1),
       (3, "Branch Manager", 80000.00, 1),
       (4, "Assistant Branch Manager", 85000.00, 1),
       (5, "Human Resources Supervisor", 90000, 2),
       (6, "Human Resources Clerk", 65000.00, 3),
       (7, "Accounting Supervisor", 70000.00, 4),
       (8, "Accounting Associate", 50000.00, 4),
       (9, "Sales Supervisor", 50000.00, 3),
       (10, "Sales Associate", 45000.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Saint", "John", 1, NULL),
       (2, "Black", "Susan", 2, 1),
       (3, "Star", "Blaze", 3, 2),
       (4, "Bonnet", "Blue", 3, 2),
       (5, "Moore", "Syca", 4 , 1),
       (6, "Japonica", "Camellia", 4 , 1),
       (7, "Cape", "Primrose", 5, 1),
       (8, "Bell", "Coral", 6, 3),
       (9, "Day", "Lily", 6, 3),
       (10, "Fall", "Crocus", 6, 3),
       (11, "Lily", "Calla", 7, 4),
       (12, "Gold", "Mary", 7, 4),
       (13, "Golden", "Rod", 8, 4),
       (14, "Flame", "Katy", 8, 4),
       (15, "Hock", "Holly", 8, 4),
       (16, "Spur", "Lark", 9, 5),
       (17, "Daisy", "Marguerite", 9, 5),
       (18, "Glover", "Fox", 10, 6),
       (19, "Moss", "Rose", 10, 6),
       (20, "Winkle", "Peri", 10, 6),
       (21, "Peace", "Lily", 10, 6);
