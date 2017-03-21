'use strict'

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ejs = require('ejs');

module.exports = () => {
    let dataPath = './resume.json';
    let templatePath = './index.html';
    const user = require(path.resolve(dataPath));
    fs.readFile(path.resolve(templatePath), 'utf-8', (err, template) => {
        //console.log(template)
        let resume = ejs.render(template, user);
        fs.writeFile(path.resolve('./resume.html'), resume, 'utf-8', error => {
            if (error) {
                console.log(chalk.red(error));
                process.exit();
            }
            console.log(chalk.green('\n Resume file resume.html build Success.\n'));
            process.exit();
        })
    });
};
