'use strict';

const angular = require('angular');
const lab22 = angular.module.('lab22');

lab22.controller('ListController', ['$log', '$http', ListController]);

function ListController($log, $http){
  this.lists = [];
  let baseUrl = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Accept': 'application/json', 
    }
  }
}
