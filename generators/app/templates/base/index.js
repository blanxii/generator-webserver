require('dotenv').config({
  silent: true
});

const packageJSON = require('./package.json');
require('babel-register')(packageJSON.babel);
require('babel-polyfill');

require('./server/index');
