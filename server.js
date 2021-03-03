const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "s331byDV!",
    database: "employee_db"
});

connection.connect( function(err) {
    if( err ) throw err; 
    console.log( "Connected to MySQL database with ID: " + connection.threadId + "\n" );
    mainMenu();
});

function mainMenu() {
    inquirer.prompt([
        {
            name: "main",
            type: "list",
            message: "Please Select a Choice to start ",
            choices: ["View All Departments","View All Roles","View All Employees", "Add a Department", "Add an Employee", "Update an Employee's Role", "Exit"]
        }
    ])
    .then(response => {
        console.log(response);
        switch(response.main) {
            case "View All Departments":
                displayDepartments();
                break;
            case "View All Roles":
                displayRoles();
                break;
            case "View All Employees":
                displayEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an Employee's Role":
                updateRole();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                mainMenu();
        }
    });
}
// Display table of all departments
function displayDepartments() {
    console.log("All departments are listed below:")
    connection.query(
        'SELECT * FROM department', (err, res) => {
            if(err) throw err;
            console.table(res);
            mainMenu();
        }

    );
};
// Display Table of all roles
function displayRoles() {
    console.log("All Roles are listed below:")
    connection.query(
        'SELECT * FROM roles', (err, res) => {
            if(err) throw err;
            console.table(res);
            mainMenu();
        }

    );
}
// Display table of all employees
function displayEmployees() {
    console.log("All Employees are listed below:")
    connection.query(
        'SELECT * FROM employee', (err, res) => {
            if(err) throw err;
            console.table(res);
            mainMenu();
        }
    
    );
};
// Add a new Department
function addDepartment() {
    console.log('Please enter information into the querys below to create a new department');
    inquirer.prompt( [
        {
            name: "name",
            message: "Enter the Department Name",
            type: "input"
        }
    ])
    .then((res) => {
        console.log(res)
        let department_name = res.name;
        createDepartment(department_name)
        .then(console.log("New Department created"))
        .then(()=> mainMenu());
    })
}
// this function actually creates the new dept after the user adds it
function createDepartment( department_name ) {
    console.log( "Department Name: ", department_name );
    return connection.promise().query('INSERT INTO department SET ?', {name: department_name},
    (err, res) => {
        if(err) throw err;
        console.table(res);
    } );
}
// add an employee
function addEmployee() {
    console.log('Please enter information into the querys below to create a new employee');
    inquirer.prompt([
        {
            name: "first_name",
            message: "What is the new employee's first name?",
            type: "input",
        },
        {
            name: "last_name",
            message: "What is the new employee's last name?",
            type: "input",
        },
        {
            name: "role_id",
            message: "What is the new employee's roll_id?",
            type: "input",
        },
        {
            name: "manager_id",
            message: "What is the new employee's manager_id?",
            type: "input",
        },
        {
            name: "department_id",
            message: "What is the new employee's department_id?",
            type: "input",
        }
    ])
    .then((res) => {
        console.log(res)
        createEmployee(res)
        .then(console.log("employee added"))
        .then(() => mainMenu());
    });
};
// this function actually creates the new employee after the user adds it
function createEmployee(res) {
    return connection.promise().query('INSERT INTO employee SET ?',
    {first_name: res.first_name, last_name: res.last_name, role_id: res.role_id, manager_id: res.manager_id, department_id: res.department_id},
    (err, res) => {
        if(err) throw err;
        console.table(res);
    });
}
// upate an employee's role in the company
function updateRole() {
    console.log('Please enter information into the querys below to create a new department');
    inquirer.prompt([
        {
            name: "id",
            message: "What is the employee's id number?",
            type: "input",
        },
        {
            name: "role_id",
            message: "What is the employee's new role_id?",
            type: "input",
        }
    ])
    .then( data => {
        createRole(data)
        .then( console.log("Employee Role Updated") )
        .then( ()=> mainMenu() );
    });
};
// this function actually creates the new role after the user adds it
function createRole(data) {   
    return connection.promise().query(
        'UPDATE employee SET role_id = ? WHERE id = ? ', 
        [data.role_id,  data.id],                   
            (err, res) => {
                if(err) throw err; 
                console.table(res);
             }
    );
    
};