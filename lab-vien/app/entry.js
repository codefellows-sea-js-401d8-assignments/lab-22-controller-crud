'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./style/scss/main.scss');

const angular = require('angular');
angular.module('noteApp', []);

require('./controller/list-controller');
