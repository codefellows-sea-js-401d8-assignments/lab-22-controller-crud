'use strict';

const angular = require('angular');
const crudApp = angular.module('crudApp');

crudApp.controller('CrudController', ['$log', '$http', CrudController]);

function CrudController($log, $http){
  this.lists = [];
  let baseUrl = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  this.createList = function(list) {
    $http.post(baseUrl, list, config)
      .then( res => {
        this.lists.push(res.data);
      })
      .catch(err => {
        $log.log('error', err);
      });
  };

  this.readList = function() {
    $http.readList(baseUrl)
    .then(res => {
      
    })
    .catch(err => {
      $log.log('error', err);
    });
  };
}
