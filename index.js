//Import NPM modules
const inquirer = require('inquirer');

//Import class files into main js file
const Employee = require('./lib/employee.js');
const Manager = require('./lib/manager.js');
const Engineer = require('./lib/engineer.js');
const Intern = require('./lib/intern.js');

//Global Variables
let engineers = [];
let interns = [];

let createEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeType',
            message: 'What kind of employee do you want to add to the team?',
            choices: ['Engineer', 'Intern','None']
        }
    ])
    .then((answers) => {
        switch (answers.employeeType) {
            case 'Engineer':
                createEngineer();
                break;
            case 'Intern':
                createIntern();
                break;
            case 'None':
                createPage();
        }
    })
    .catch((err) => console.error(err));
}

let createManager = () => {
    console.log('Let\'s set up the team manager:');
    const mngrQuestions = [
        {
            type: 'input',
            name: 'mngrName',
            message: 'What is the Manager\'s name?'
        },
        {
            type: 'input',
            name: 'mngrId',
            message: 'What is their employee ID?'
        },
        {
            type: 'input',
            name: 'mngrEmail',
            message: 'What is their email?',

            validate(val) {
                for(let i = 0; i < val.length; i++) {
                    if(val[i] === '@') {
                        return true;
                    }
                }
                return 'Please enter a valid email';
            }
        },
        {
            type: 'input',
            name: 'mngrOffice',
            message: 'What is their office number?'
        }
    ];

    inquirer.prompt(mngrQuestions)
        .then((answers) => {
            let boss = new Manager(answers.mngrName, answers.mngrId, answers.mngrEmail, answers.mngrOffice);
            let role = boss.getRole();
            console.log(boss);
        })
        .then(createEmployee())
        .catch((err) => console.error(err));
};

let init = () => {
    console.log('Please set up your team.');
    createManager();
};

init();
