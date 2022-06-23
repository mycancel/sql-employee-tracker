const mysql = require('mysql2');
const { DEC8_BIN } = require('mysql2/lib/constants/charsets');

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

// Returns information from table department
const viewDepartments = async () => { 
    const companyDb = getConnection();
    console.log(companyDb);
};

viewDepartments();