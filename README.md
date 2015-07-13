# Hiof course-catalogue plugin

## About

A plugin with the required files for the course catalogue.

## Copyright

This project is distributed under a GNU General Public License v3 - Take a look at the COPYING file for details.

## Install

Install [Git](http://git-scm.com) if it's not already installed on your computer. Then run (this will download this project to the folder the shell has open):

```
$ git clone https://github.com/hiof/course-catalogue.git
```

Install [io.js](https://iojs.org) (or [Node.js](http://nodejs.org)) if it's not already installed on your computer. Then run (this will install the project dependencies):

```
$ sudo npm install -g grunt-cli
$ npm install
$ bower install
```

## Build

`$ grunt build`: Compiles and builds the course-catalogue plugin

## Deploy

1. Rename secret-template.json to secret.json and add your credentials.
2. Deploy and test your code on the staging server `$ grunt deploy-stage`
3. Deploy to production `$ grunt deploy-prod`

## Dependency

- Needs to run on neted3.hiof.no in a regular template

## Required

- Required for the hiof.no course catalogue to work

## Releases

[Github releases](https://github.com/hiof/course-catalogue/releases)

### Roadmap

v1.0.0 - Initial course-catalogue
