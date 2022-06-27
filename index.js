const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// Creates connection to the database
const companyDb = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
);

const methods = {
    // Recieves and displays all information from department table
    viewAllDepartments() {
        companyDb.query('SELECT id, name FROM department', (err, results) => {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },
    // Recieves and displays all information from role table
    viewAllRoles() {
        companyDb.query(`
        SELECT role.id, 
        title, 
        salary, 
        department.name AS department 
        FROM role
        JOIN department ON department.id = role.department_id
        `, (err, results) => {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },
    // Recieves and displays all information from employee table
    // TODO: Self Join
    viewAllEmployees() {
        companyDb.query(`
        SELECT employee.id,
        CONCAT(first_name, " ", last_name) AS name, 
        role.title AS role, 
        manager_id AS manager 
        FROM employee
        JOIN role ON role.id = employee.role_id
        `, (err, results) => {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },
    // Adds a row to department table
    addDepartment(name) {
        const newDepart = name.trim();
        companyDb.query('INSERT INTO department (name) VALUES (?)', newDepart, (err, results) => {
            if (err) return console.error(err);
            console.log(`Added ${newDepart} into the database`);
            return init();
        })
    },
    // Converts role inquirer answers from askMore into usable data for addRole
    convertRoleData(answers) {
        const newTitle = answers.title.trim();
        const newSalary = parseInt(answers.salary.trim());
        const newDepart = answers.department.trim();
        
        companyDb.query('SELECT id FROM department WHERE name = ?', newDepart , (err, results) => {
            if (err) return console.error(err);
            const departId = results[0].id;
            return this.addRole(newTitle, newSalary, departId)
        });
    },
    // Adds a row to role table
    addRole(title, salary, id) {
        companyDb.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, id], (err, results) => {
            if (err) return console.error(err);
            console.log(`Added ${title} into the database`);
            return init();
        });
    },
};

const init = () => {
    const choices = [
        { name: 'View All Departments', value: 'viewAllDepartments' },
        { name: 'View All Roles', value: 'viewAllRoles' },
        { name: 'View All Employees', value: 'viewAllEmployees' },
        { name: 'Add a Department', value: 'addDepartment' },
        { name: 'Add a Role', value: 'addRole' },
        { name: 'Add an Employee', value: 'addEmployee' },
        { name: 'Quit', value: 'Quit'}
    ];
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: choices
        }
    ])
    .then((answer) => {
        const action = answer.action;
        if (action === 'Quit') return process.exit();

        const index = choices.findIndex((choice) => choice.value === action);
        // View all data from table
        if (index >= 0 && index <= 2) methods[action]();
        // Ask additional questions
        if (index >= 3 && index <= 5) askMore(action);
    })
    .catch((err) => console.log(err));
};

// Asks for additional information to insert into tables
const askMore = (choice) => {
    if (choice === 'addDepartment') {
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'name',
            }
        ])
        .then((answers) =>  methods[choice](answers.name))
        .catch((err) => console.log(err));

    } else if (choice === 'addRole') {
        // TODO: add query for departments
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'title',
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary',
            },
            {
                type: 'input',
                message: 'What is the department of the role?',
                name: 'department',
            }
        ])
        .then((answers) =>  methods['convertRoleData'](answers))
        .catch((err) => console.log(err));

    } else {
        // TODO: Add query for roles, and managers 
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the first name of the employee?',
                name: 'first',
            },
            {
                type: 'input',
                message: 'What is the last name of the employee?',
                name: 'last',
            },
            {
                type: 'input',
                message: 'What is the role of the employee?',
                name: 'role',
            },
            {
                type: 'input',
                message: 'Who is the manager of the employee?',
                name: 'manager',
            },
        ])
        .then((answers) =>  methods[choice](answers))
        .catch((err) => console.log(err));
    }
};

init();