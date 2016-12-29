'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function() {

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('generator-webserver') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.appname
    }, {
      type: 'confirm',
      name: 'templateEngine',
      message: 'Do you want to use template engine (nunjucks)?',
      default: false
    }, {
      type: 'confirm',
      name: 'pm2',
      message: 'Do you want to use PM2?',
      default: false
    },
    {
      type: 'list',
      name: 'database',
      message: 'Which database do you want to use?',
      choices: [{
         name: 'mysql | postgresql | sqlite',
         value: 'mysql'
     }, {
         name: 'mongodb',
         value: 'mongodb'
     }]
    }];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function() {
    var self = this;
    var dependencies = [];

    self.fs.copyTpl(
      self.templatePath('base/**/*'),
      self.destinationRoot(), {
        name: self.props.name,
        options: {
          database: self.props.database
        }
      }
    );

    var hiddenFiles = ['editorconfig', 'env', 'gitignore', 'jshintrc'];
    hiddenFiles.map(function(hiddenFile) {
      self.fs.copyTpl(
        self.templatePath('hidden/' + hiddenFile),
        self.destinationPath('.' + hiddenFile), {
          globOptions: {
            dot: true
          },
          name: self.props.name,
          options: {
            database: self.props.database
          }
        }
      );
    });

    if (self.props.pm2 === true) {
      self.fs.copyTpl(
        self.templatePath('config/pm2/**/*'),
        self.destinationPath('config/pm2'), {
          name: self.props.name,
          options: {
            database: self.props.database
          }
        }
      );
    }
    if (self.props.database === 'mongodb') {
      dependencies.push('bluebird', 'mongoose');
    } else {
      dependencies.push('sequelize', 'mysql');
    }

    if (self.props.templateEngine === true) {
      dependencies.push('express-nunjucks', 'nunjucks');

      self.fs.copyTpl(
        self.templatePath('config/nunjucks-index.js'),
        self.destinationPath('server/index.js')
      );

      self.fs.copy(
        self.templatePath('client/**/*'),
        self.destinationPath('client')
      );

    } else {
      self.fs.copyTpl(
        self.templatePath('config/default-index.js'),
        self.destinationPath('server/index.js')
      );
    }

    this.npmInstall(dependencies, {
      'save': true
    });
  },

  install: function() {

    var self = this;
    self.installDependencies({
      bower: false,
      callback: function() {
        self.log('\n\nRun' + chalk.red(' npm start ') + 'to start coding!\n');
      }
    });
  }
});
