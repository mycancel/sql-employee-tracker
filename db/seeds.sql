INSERT INTO department (name)
VALUES
    ( "Engineering" ),
    ( "Finance" ),
    ( "Legal" ),
    ( "Sales" );

INSERT INTO role (title, salary, department_id)
VALUES
    ( "Software Engineer", 130000, 001 ),
    ( "Lead Engineer", 160000, 001 ),
    ( "Accountant", 130000, 002 ),
    ( "Account Manager", 165000, 002 ),
    ( "Legal Team Lead", 255000, 003 ),
    ( "Lawyer", 200000, 003 ),
    ( "Sales Lead", 110000, 004 ),
    ( "Salesperson", 85000, 004 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ( "Sally", "Edwin", 001, 004 ),
    ( "Samuel", "Edwards", 001, 004 ),
    ( "Susan", "Ellis", 001, 004 ),
    ( "Lee", "Evans", 002, null ),
    ( "Amy", "Adams", 003, 006 ),
    ( "Andrew", "Madison", 004, null ),
    ( "Laura", "Thomas", 005, null ),
    ( "Lawrence", "Lawyer", 006, 007 ),
    ( "Lance", "Lee", 006, 007 ),
    ( "Sal", "Lewis", 007, null ),
    ( "Sam", "Peters", 007, 010 ),
    ( "Scott", "Phillips", 007, 010 );
