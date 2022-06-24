INSERT INTO department (id, name)
VALUES
    ( 001, "Engineering"),
    ( 002, "Finance"),
    ( 003, "Legal"),
    ( 004, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES
    ( 001, "Software Engineer", 130000, 001),
    ( 002, "Lead Engineer", 160000, 001),
    ( 003, "Accountant", 130000, 002),
    ( 004, "Account Manager", 165000, 002),
    ( 005, "Legal Team Lead", 255000, 003),
    ( 006, "Lawyer", 200000, 003),
    ( 007, "Sales Lead", 110000, 004),
    ( 008, "Salesperson", 85000, 004);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    ( 001, "Sally", "Edwin", 001, 004),
    ( 002, "Samuel", "Edwards", 001, 004),
    ( 003, "Susan", "Ellis", 001, 004),
    ( 004, "Lee", "Evans", 002, null),
    ( 005, "Amy", "Adams", 003, 006),
    ( 006, "Andrew", "Madison", 004, null),
    ( 007, "Laura", "Thomas", 005, null),
    ( 008, "Lawrence", "Lawyer", 006, 007),
    ( 009, "Lance", "Lee", 006, 007),
    ( 010, "Sal", "Lewis", 007, null),
    ( 011, "Sam", "Peters", 007, 010),
    ( 012, "Scott", "Phillips", 007, 010);
