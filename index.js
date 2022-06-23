const mysql = require('mysql2');
const cTable = require('console.table');

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

viewDepartments();