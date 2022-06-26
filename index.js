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
        companyDb.query('SELECT * FROM department', (err, results) => {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },
    // Recieves and displays all information from role table
    viewAllRoles() {
        companyDb.query('SELECT * FROM role', (err, results) => {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },
    // Recieves and displays all information from employee table
    viewAllEmployees() {
        companyDb.query('SELECT * FROM employee', (err, results) => {
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
        // View All choices
        if (index >= 0 && index <= 2) methods[action]();
        // Ask additional questions
        if (index >= 3 && index <= 5) askMore(action);
    })
    .catch((err) => console.log(err));
};

// Asks for additional information to insert into tables
const askMore = (table) => {
    if (table === 'addDepartment') {
        console.log(table);
        // TODO: Add additional inquirer prompts and call module classes
    } else if (table === 'addRole') {
        console.log(table);
        // TODO: Add additional inquirer prompts and call module classes
    } else {
        console.log(table);
        // TODO: Add additional inquirer prompts and call module classes
    }
};

init();