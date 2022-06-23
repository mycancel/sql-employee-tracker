const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// Creates connection to the database
// TODO: Create this into a global variable? Or keep as a function?
const getConnection = () => {
    const companyDb = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'company_db'
        },
    );
    console.log('Connection recieved.')
    return companyDb;
};

// Recieves information from table department
const viewDepartments = () => { 
    const companyDb = getConnection();
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