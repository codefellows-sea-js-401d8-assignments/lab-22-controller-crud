'use strict';

const angular = require('angular');
const crudApp = angular.module('crudApp');

crudApp.controller('ListController', ['$log', '$http', ListController]);

function ListController($log, $http){
  this.lists = [];

  let baseUrl = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  this.getList = function() {
    $http.get(baseUrl, config)
      .then( res => {
        this.lists = res.data
      })
      .catch( err => {
        $log.error('err', err)
      })
  }


  this.createList = function(list) {
    $log.debug('listCtrl.createList')
    $http.post(baseUrl, list, config)
      .then( res => {
        $log.log('success!', res.data);
        this.lists.push(res.data);
      })
      .catch( err => {
        $log.error('fail', err);
        alert('you fud up');
      });
  }
};
