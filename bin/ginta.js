#!/usr/bin/env node

'use strict'

require('../lib/check-versions')();

const commander = require('commander');

commander
    .version(require('../package').version);

commander
    .usage('<command>');

commander
    .command('init')
    .description('Initialize a new resume')
    .alias('i')
    .action(require('./init'));

commander
    .command('build')
    .description('Build resume from json data')
    .alias('b')
    .option("-t, --type [type]", "Which file type to export", /^(html|pdf)$/i, "html")
    .action(require('./build'));

commander
    .command('list')
    .description('List the configuration file')
    .alias('l')
    .action(require('./list'));

commander
    .command('add')
    .description('Add template')
    .alias('a')
    .action(require('./add'));

commander
    .command('remove')
    .description('Remove template')
    .alias('r')
    .action(require('./remove'));

if (!commander.parse(process.argv).args.length) commander.help();
