'use strict'

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ejs = require('ejs');
const html2pdf = require('html-pdf');

module.exports = (options) => {
    let type = options.type || 'html';
    let dataPath = './resume.json';
    let templatePath = './index.html';
    const user = require(path.resolve(dataPath));
    fs.readFile(path.resolve(templatePath), 'utf-8', (err, template) => {
        //console.log(template)
        let resume = ejs.render(template, user);
        if (type == 'html') {
            fs.writeFile(path.resolve('./resume.html'), resume, 'utf-8', error => {
                if (error) {
                    console.log(chalk.red(error));
                    process.exit();
                }
                console.log(chalk.green('\n Resume file resume.html build Success.\n'));
                process.exit();
            })
        } else {
            console.log('file://' + path.resolve('.'));
            // process.exit();
            html2pdf.create(resume, { format: 'A4', base: 'file://' + path.resolve('.') }).toFile('./resume.pdf', (error, res) => {
                if (error) {
                    console.log(chalk.red(error));
                    process.exit();
                }
                console.log(chalk.green(`\n Resume file ${res.filename} build Success.\n`));
                process.exit();
            });
        }
        
    });
};
