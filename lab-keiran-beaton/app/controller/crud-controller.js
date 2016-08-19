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
        console.log(res.data);
      })
      .catch(err => {
        $log.log('error', err);
      });
  };

  this.deleteList = function(list) {
    $http.delete(baseUrl, list, config)
    .then(() => {
      for (var i = 0; i < this.lists.length; i++) {
        if(this.lists[i] === list) {
          this.lists.splice(i, 1);
        }
      }
    });
  };
}
