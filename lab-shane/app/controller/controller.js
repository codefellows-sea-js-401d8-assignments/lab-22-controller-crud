'use strict';

const angular = require('angular');
const crudApp = angular.module('crudApp');

crudApp.controller('CrudController', ['$log', '$http', CrudController]);

function CrudController($log, $http){
  this.lists = [];
  this.showAll = false;
  let baseUrl = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  this.create = function(list){
    $log.debug('listCtrl.create');
    $http.post(baseUrl, list, config)
    .then((res)=>{
      $log.log('success!', res.data);
    }).catch((error)=>{
      $log.error('error', error);
    });
  };

  this.delete = function(id){
    $log.debug('listCtrl.delete');
    $http.delete(baseUrl + '/' + id, config)
    .then((res)=>{
      $log.log('success!', res.data);
    }).catch((error)=>{
      $log.error('error', error);
    });
  };

  this.getAll = function(){
    $log.debug('listCtrl.getAll');
    $http.get(baseUrl, config)
    .then((res)=>{
      $log.log('success!', res.data);
      this.lists = res.data;
    }).catch((error)=>{
      $log.error('error', error);
    });
    this.showAll = true;
  };

}
