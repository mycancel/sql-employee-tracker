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
        SELECT id, 
        title, 
        salary, 
        department_id AS department 
        FROM role
        `, (err, results) => {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },
    // Recieves and displays all information from employee table
    viewAllEmployees() {
        companyDb.query(`
        SELECT id, 
        CONCAT(first_name, " ", last_name) AS name, 
        role_id AS role, 
        manager_id AS manager
        FROM employee
        `, (err, results) => {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },
};

const init = () => {
    const choices = [
        { name: 'View All Departments', value: 'viewAllDepartments' },
        { name: 'View All Roles', value: 'viewAllRoles' },
        { name: 'View All Employees', value: 'viewAllEmployees' },
        // { name: 'Add a Department', value: 'addDepartment' },
        // { name: 'Add a Role', value: 'addRole' },
        // { name: 'Add an Employee', value: 'addEmployee' },
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
        // View All choices
        if (index >= 0 && index <= 2) methods[action]();
        // Ask additional questions
        if (index >= 3 && index <= 5) askMore(action);
    })
    .catch((err) => console.log(err));
};

// Asks for additional information to insert into tables
const askMore = (choice) => {
    if (choice === 'addDepartment') {
        // TODO: Add additional inquirer prompts and call module classes
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'name',
            }
        ])
        .then((answers) => console.log(answers))
        .catch((err) => console.log(err));
    } else if (choice === 'addRole') {
        console.log(choice);
        // TODO: Add additional inquirer prompts and call module classes
    } else {
        console.log(choice);
        // TODO: Add additional inquirer prompts and call module classes
    }
};

init();