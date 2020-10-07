var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Nylea$0$0",
    database: "employees"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runSearch();
});


const viewOptions = [
    "View Departments",
    "View Roles",
    "View Employees",
    "Update Employee",
    "exit"
];

const employeeOptions = [
    "John Doe",
    "Sam Doe",
    "exit"
];

const updateOptions = [
    "First Name",
    "Last Name",
    "Role",
    "exit"
];


function runSearch() {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: viewOptions
        })
        .then(function (answer) {
            switch (answer.action) {
                case viewOptions[0]:
                    connection.query("SELECT * FROM department", function (err, result, fields) {
                        if (err) throw err;
                        console.table(result);
                        runSearch();
                        // code goes here that somehow goes back to menu of options
                      });
                    break;

                case viewOptions[1]:
                    connection.query("SELECT * FROM role", function (err, result, fields) {
                        if (err) throw err;
                        console.table(result);
                        runSearch();
                    });
                    break;

                case viewOptions[2]:
                    connection.query("SELECT * FROM employee", function (err, result, fields) {
                        if (err) throw err;
                        console.table(result);
                        runSearch();
                    });
                    break;

                case viewOptions[3]:
                   updateEmployee();
                   const updateEmployee = () => {

                    function runUpdateSearch() {
                        inquirer
                            .prompt({
                                name: "action",
                                type: "list",
                                message: "Which employee do you want to update?",
                                choices: employeeOptions
                            })
                           
                    }
                    runUpdateSearch();  
                };
                    break;

                case updateOptions[4]:
                    connection.end();
                    break;
            }
        })
}




    // connnection.query("SELECT * FROM department", function (err, result, fields) {
    //   if (err) throw err;
    //   console.log(result);
    // });
 
