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

const init = () => {
    const choices = [
        { name: 'View All Departments', value: 'viewAllDepartments' },
        { name: 'View All Roles', value: 'viewAllRoles' },
        { name: 'View All Employees', value: 'viewAllEmployees' },
        { name: 'Add a Department', value: 'promptAddDepart' },
        { name: 'Add a Role', value: 'getDepartments' },
        { name: 'Add an Employee', value: 'getRoles' },
        { name: 'Update an Employee', value: 'getEmployees' },
        { name: 'Quit', value: 'Quit' }
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
            else return methods[action]();
        })
        .catch((err) => console.log(err));
};

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
        LEFT JOIN department ON department.id = role.department_id
        `, (err, results) => {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },

    // Recieves and displays all information from employee table
    viewAllEmployees() {
        companyDb.query(`
        SELECT e.id,
        CONCAT(e.first_name, " ", e.last_name) AS name, 
        role.title AS role, 
        CONCAT(m.first_name, " ", m.last_name) AS manager_name
        FROM employee e
        LEFT JOIN role ON role.id = e.role_id
        LEFT JOIN employee m ON e.manager_id = m.id
        `, (err, results) => {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },

    // Prompts inquirer questions for addDepartment
    promptAddDepart() {
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'name',
            }
        ])
            .then((answers) => this.addDepartment(answers.name))
            .catch((err) => console.log(err));
    },
    // Adds a row to department table
    addDepartment(name) {
        const department = name.trim();
        companyDb.query('INSERT INTO department (name) VALUES (?)', department, (err, results) => {
            if (err) return console.error(err);
            console.log(`Added ${department} into the database\n`);
            return init();
        })
    },

    // Queries department information to be passed into promptAddRole
    getDepartments() {
        companyDb.query('SELECT id, name FROM department', (err, results) => {
            if (err) return console.error(err);
            const departments = [];
            results.forEach((item) => departments.push({ name: item.name, value: item.id }));
            return this.promptAddRole(departments);
        });
    },
    // Prompts inquirer questions for addRole
    promptAddRole(departments) {
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
                type: 'list',
                message: 'What is the department of the role?',
                name: 'department',
                choices: departments,
            }
        ])
            .then((answers) => this.addRole(answers))
            .catch((err) => console.log(err));
    },
    // Adds a row to role table
    addRole(answers) {
        const title = answers.title.trim();
        const salary = parseInt(answers.salary.trim());
        const id = parseInt(answers.department);

        companyDb.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, id], (err, results) => {
            if (err) return console.error(err);
            console.log(`Added ${title} into the database\n`);
            return init();
        });
    },

    // Queries role information to be passed into getManagers and then promptAddEmploy 
    getRoles() {
        companyDb.query('SELECT id, title FROM role', (err, results) => {
            if (err) return console.error(err);
            const roles = [];
            results.forEach((item) => roles.push({ name: item.title, value: item.id }));
            return this.getManagers(roles);
        });
    },
    // Queries role information to be passed into promptAddEmploy 
    getManagers(roles) {
        companyDb.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL', (err, results) => {
            if (err) return console.error(err);
            const managers = [{ name: 'None', value: null }];
            results.forEach((item) => managers.push({ name: item.first_name + ' ' + item.last_name, value: item.id }));
            return this.promptAddEmploy(roles, managers);
        });
    },
    // Prompts inquirer questions for addEmployee
    promptAddEmploy(roles, managers) {
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
                type: 'list',
                message: 'What is the role of the employee?',
                name: 'role',
                choices: roles,
            },
            {
                type: 'list',
                message: 'Who is the manager of the employee?',
                name: 'manager',
                choices: managers,
            },
        ])
            .then((answers) => this.addEmployee(answers))
            .catch((err) => console.log(err));
    },
    // Adds a row to the employee table
    addEmployee(answers) {
        const first = answers.first.trim();
        const last = answers.last.trim();
        const roleId = parseInt(answers.role);
        const managerId = parseInt(answers.manager);

        companyDb.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first, last, roleId, managerId], (err, results) => {
            if (err) return console.error(err);
            console.log(`Added ${first + ' ' + last} into the database\n`);
            return init();
        });
    },

    // Queries employee information to be passed into getEmployRole and promptUpdateEmploy
    getEmployees() {
        companyDb.query('SELECT id, first_name, last_name FROM employee', (err, results) => {
            if (err) return console.error(err);
            const employees = [];
            results.forEach((item) => employees.push({ name: item.first_name + ' ' + item.last_name, value: item.id }));
            return this.getEmployRole(employees);
        });
    },
    // Queries role information to be passed into promptUpdateEmploy
    getEmployRole(employees) {
        companyDb.query('SELECT id, title FROM role', (err, results) => {
            if (err) return console.error(err);
            const roles = [];
            results.forEach((item) => roles.push({ name: item.title, value: item.id }));
            return this.promptUpdateEmploy(employees, roles);
        });
    },
    // Prompts inquirer questions for updateEmploy
    promptUpdateEmploy(employees, roles) {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee\'s role do you want to update?',
                name: 'employee',
                choices: employees,
            },
            {
                type: 'list',
                message: 'What is the employee\'s new role?',
                name: 'role',
                choices: roles,
            }
        ])
            .then((answers) => this.updateEmploy(answers.employee, answers.role))
            .catch((err) => console.log(err));
    },
    // Updates role of employee in employee table
    updateEmploy(employee, role) {
        companyDb.query('UPDATE employee SET role_id = ? WHERE id = ?', [role, employee], (err, results) => {
            if (err) return console.error(err);
            console.log(`Updated employee in the database\n`);
            return init();
        })
    },
};

init();