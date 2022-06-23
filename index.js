const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');


// Recieves information from table department
const viewDepartments = () => {
    // Creates connection to the database
    const companyDb = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'company_db'
        },
    );
    companyDb.query('SELECT * FROM department', (err, results) => {
        console.table(results);
    })
};

const init = () => {
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
            ]
        }
    ])
        .then((choice) => viewDepartments())
        .catch((err) => console.log(err));
};

init();