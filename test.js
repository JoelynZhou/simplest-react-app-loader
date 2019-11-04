/**
 * Test Demo
 */
const inquirer = require('inquirer'); //为用户提供交互和查询会话流
inquirer.prompt([{
    type: 'confirm',
    name: 'test',
    message: 'Are you handsome?',
    default: true
}]).then((answers) => {
    console.log('结果为:')
    console.log(answers)
})