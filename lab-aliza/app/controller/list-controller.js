'use strict';

const angular = require('angular');
const listApp = angular.module('listApp');

listApp.controller('ListController', ['$log', '$http', ListController]);

function ListController($log, $http){
  this.lists = [];
  let baseUrl = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  this.createList = function(list){
    $log.debug('listCtrl.createList');
    $http.post(baseUrl, list, config)
      .then(res => {
        $log.log('Success!', res.data);
        this.lists.push(res.data);
      })
      .catch(err => {
        $log.log('Error: ', err);
      });
  };
}
