# ginta-cli (WIP)

A simple resume builder CLI.

### Installation

```sh
$ npm install -g ginta-cli
```

### Get Started

```sh
$ ginta init <template-name> <resume-name>
```

Example:

```sh
$ ginta init simple fireyy
```

The above command pulls the template from [fireyy/ginta-simple](https://github.com/fireyy/ginta-simple)(specify in configuration file), prompts for some information, and generates the resume at `./fireyy/`.

### Usage

```sh
Usage: ginta <command>

  Commands:

    init|i     Initialize a new resume
    list|l     List the configuration file
    add|a      Add template
    remove|r   Remove template

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```
