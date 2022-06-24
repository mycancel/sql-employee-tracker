const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');


// Recieves information from table department
const viewAll = (table) => {
    // Creates connection to the database
    const companyDb = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'company_db'
        },
    );
    companyDb.query(`SELECT * FROM ${table}`, (err, results) => {
        console.table(results);
    })
};

const init = () => {
    const choices = [
        {name: 'View All Departments', value: 'department', short: 'View All Departments'},
        {name: 'View All Roles', value: 'role', short: 'View All Roles'},
        {name: 'View All Employees', value: 'employee', short: 'View All Employees'},
        'Quit'
    ];
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'action',
            message: 'What would you like to do?',
            choices: choices
        }
    ])
        .then((answer) => {
            if (answer.action === 'Quit') return '';
            const index = choices.findIndex((choice) => choice.value === answer.action);
            // View All choices
            if (index >= 0 && index <= 2) viewAll(answer.action);
        })
        .catch((err) => console.log(err));
};

init();