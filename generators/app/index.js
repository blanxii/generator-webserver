'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the ace ${chalk.red('generator-webserver-v-2')} generator!`)
    );

    this.dependencies = [];

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'templateEngine',
        message: 'Do you want to use template engine (nunjucks)?',
        default: false
      },
      {
        type: 'confirm',
        name: 'pm2',
        message: 'Do you want to use PM2?',
        default: false
      },
      {
        type: 'list',
        name: 'database',
        message: 'Which database do you want to use?',
        choices: [
          {
            name: 'mysql | postgresql | sqlite',
            value: 'mysql'
          },
          {
            name: 'mongodb',
            value: 'mongodb'
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const self = this;
    const copy = [];

    copy.push({
      origin: 'webserver/**/*',
      destination: '.'
    });

    ['editorconfig', 'env', 'gitignore', 'babelrc', 'eslintrc.js'].map(hiddenFile =>
      copy.push({
        origin: 'hidden/' + hiddenFile,
        destination: '.' + hiddenFile
      })
    );

    if (self.props.pm2) {
      copy.push({
        origin: 'pm2/*',
        destination: 'config/pm2'
      });
    }

    if (self.props.database === 'mongodb') {
      this.dependencies.push('bluebird', 'mongoose');
    } else {
      this.dependencies.push('sequelize', 'mysql');
    }

    if (self.props.templateEngine) {
      this.dependencies.push('express-nunjucks', 'nunjucks');
      copy.push({
        origin: 'client/',
        destination: 'client/'
      });
    }

    copy.forEach(copyPath => {
      self.fs.copyTpl(
        self.templatePath(copyPath.origin),
        self.destinationPath(copyPath.destination),
        {
          globOptions: {
            dot: true
          },
          name: self.props.name,
          options: {
            database: self.props.database,
            templateEngine: self.props.templateEngine
          }
        }
      );
    });
  }

  install() {
    var self = this;

    self.npmInstall(this.dependencies, {
      save: true
    });

    self.installDependencies({
      bower: false,
      callback: () => {
        self.log(`\n\nRun ${chalk.red(' npm start ')} to start coding!\n`);
      }
    });
  }
};
