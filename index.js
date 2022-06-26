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
    // Recieves and displays all information from table
    viewAll(table) {
        companyDb.query('SELECT * FROM ??', table, (err, results) => {
            if (err) return console.error(err);
            console.table(results);
        })
        return init();
    },
};

// Asks for additional information to insert into tables
const askMore = (table) => {
    if (table === 'add department') {
        console.log(table);
        // TODO: Add additional inquirer prompts and call module classes
    } else if (table === 'add role') {
        console.log(table);
        // TODO: Add additional inquirer prompts and call module classes
    } else {
        console.log(table);
        // TODO: Add additional inquirer prompts and call module classes
    }
}

const init = () => {
    const choices = [
        { name: 'View All Departments', value: 'department' },
        { name: 'View All Roles', value: 'role' },
        { name: 'View All Employees', value: 'employee' },
        // { name: 'Add a Department', value: 'add department' },
        // { name: 'Add a Role', value: 'add role' },
        // { name: 'Add an Employee', value: 'add employee' },
        { name: 'Quit', value: 'Quit'}
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
            console.log(answer);
            const index = choices.findIndex((choice) => choice.value === answer.action);
            console.log(index);
            // View All choices
            if (index >= 0 && index <= 2) viewAll(answer.action);
            // Ask additional questions
            if (index >= 3 && index <= 5) askMore(answer.action);
        })
        .catch((err) => console.log(err));
};

init();