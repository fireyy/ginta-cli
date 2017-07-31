'use strict'

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ejs = require('ejs');
const convertFactory = require('electron-html-to');

const conversion = convertFactory({
  converterPath: convertFactory.converters.PDF,
  allowLocalFilesAccess: true
});

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
            // process.exit();
            resume = resume.replace(/href="|src="/g, match => {
                return match + 'file://' + path.resolve('.') + '/';
            });
            conversion({ html: resume }, function(err, result) {
                if (err) {
                    return console.error(err);
                }

                console.log(result.numberOfPages);
                console.log(result.logs);
                result.stream.pipe(fs.createWriteStream('./resume.pdf'));
                conversion.kill();
            });
            
        }
        
    });
};
