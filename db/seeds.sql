USE employee_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id)
VALUES 
    ("John", "Smith", 2, null, 1),
    ("Frank", "Jones", 2, 1, 1),
    ("Kimberly", "Smith", 2, 1, 1),
    ("Adam", "Johnson", 3, 4, 2),
    ("Harold", "Allan", 3, 4, 2),
    ("Sarah", "Franklin", 4, null, 2),
    ("Kelly", "Thomas", 5, null, 3),
    ("Matthew", "Hanks", 6, 7, 4),
    ("Tracy", "Koch", 7, null, 4);
    

INSERT INTO roles (title, salary, department_id) 
VALUES 
    ("Sales Agent", 75000.00, 1),
    ("Sales Lead", 100000.00, 1),
    ("Software Engineer", 120000.00, 2),
    ("Lead Engineer", 145000.00, 2),
    ("Accountant", 75000.00, 3),
    ("Attorney", 175000.00, 4),
    ("Lead Attorney", 215000.00, 4);


INSERT INTO department (name) 
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");