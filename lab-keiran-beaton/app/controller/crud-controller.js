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

  this.createList = function(newList) {
    $log.debug('Create list method');
    $http.post(baseUrl, newList, config)
      .then((res) => {
        $log.log('Success!', res.data);
        this.lists.push(res.data);
      })
      .catch(err => {
        $log.log('error', err);
        return err;
      });
  };

  this.getList = function(listId) {
    $log.debug('Get List Method');
    $http.get(baseUrl + '/' + listId, config)
    .then(res => {
      $log.log('Success!', res.data);
    })
    .catch((err) => {
      $log.log('error', err);
      return err;
    });
  };

  this.deleteListLocally = function(listId) {
    this.lists = this.lists.filter((list) => {
      return list._id !== listId;
    });
  };

  this.deleteList = function(listId) {
    $log.debug('Delete list method');
    $http.delete(baseUrl + '/' + listId, config)
      .then((res) => {
        $log.log('Success!', res.data);
        this.deleteListLocally(listId);
      })
      .catch((err) => {
        $log.log('error', err);
        return err;
      });
  };
}
