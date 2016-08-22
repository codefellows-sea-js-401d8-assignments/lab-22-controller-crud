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
      .then( res => {
        $log.log('res.data', res.data);
        this.lists.push(res.data);
      })
      .catch(err => {
        $log.log('error', err);
      });
  };

  this.readList = function(listToRead) {
    $log.debug('Read List Method');
    $http.get(baseUrl, listToRead, config)
    .then(res => {
      $log.log('res.data', res.data);
    });
  };

  this.updateList = function(listToUpdate) {
    $log.debug('Update List method');
    let updatedLists = [];
    $http.put(baseUrl, listToUpdate, config)
    .then(res => {
      $log.log('res.data', res.data);
      updatedLists = this.lists.ForEach(function(list) {
        if(list._id === listToUpdate._id) {
          list = listToUpdate;
        }
      });
      this.lists = updatedLists;
    });
  };

  this.deleteList = function(listToDelete) {
    $log.debug('Delete list method');
    let filteredLists = [];
    $http.delete(baseUrl, listToDelete, config)
      .then( res => {
        $log.log('res.data', res.data);
        filteredLists = this.lists.filter(function(list) {
          if (list._id !== listToDelete._id) {
            return list;
          }
        });
        this.lists = filteredLists;
      })
      .catch(err => {
        $log.log('error', err);
      });
  };
}
