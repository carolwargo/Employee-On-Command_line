INSERT INTO department (name)

VALUES ("Managment"), 
        ("Human Resources"),
        ("Accounting"), 
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("General Manager", 120000.00, 1),
        ("Assistant Manager", 100000.00, 1),
        ("Branch Manager", 80000.00, 1),
        ("Assistant Branch Manager", 85000.00, 1),
        ("Human Resources Supervisor", 90000, 2),
        ("Human Resources Clerk", 65000.00, 3),
        ("Accounting Supervisor", 70000.00, 4),
        ("Accounting Associate", 50000.00, 4),
        ("Sales Supervisor", 50000.00, 3),
        ("Sales Associate", 45000.00, 3);
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Saint", "John", 1, NULL),
        ("Black", "Susan", 2, 1),
        ("Star", "Blaze", 3, 2),
        ("Bonnet", "Blue", 3, 2),
        ("Moore", "Syca", 4 , 1),
        ("Japonica", "Camellia", 4 , 1),
        ("Cape", "Primrose", 5, 1),
        ("Bell", "Coral", 6, 3),
        ("Day", "Lily", 6, 3),
        ("Fall", "Crocus", 6, 3),
        ("Lily", "Calla", 7, 4),
        ("Gold", "Mary", 7, 4),
        ("Golden", "Rod", 8, 4),
        ("Flame", "Katy", 8, 4),
        ("Hock", "Holly", 8, 4),
        ("Spur", "Lark", 9, 5),
        ("Daisy", "Marguerite", 9, 5),
        ("Glover", "Fox", 10, 6),
        ("Moss", "Rose", 10, 6),
        ("Winkle", "Peri", 10, 6),
        ("Peace", "Lily", 10, 6);
