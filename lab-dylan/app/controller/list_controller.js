'use strict';

const angular = require('angular');
const listApp = angular.module('listApp');
listApp.controller('ListController', ['$log', '$http', ListController]);

function ListController($log, $http) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  let baseUrl = `${__API_URL__}/api/list`;
  this.lists = [];

  this.createList = function(list) {
    $http.post(baseUrl, list, headers).then(res => {
      $log.log('success!', res.data);
      this.lists.push(res.data);
    })
    .catch( err => {
      $log.error('error!', err);
      alert('Invalid data');
    });
  };

  this.getLists = function(listId) {
    listId = listId || '';
    let url = baseUrl + '/';
    $http.get(url, headers).then( res => {
      $log.log('success', res.data);
      this.lists = [];
      if (res.data instanceof Array) {
        res.data.forEach((list) => {
          this.lists.push(list);
        });
      } else {
        this.push(res.data);
      }
    })
    .catch( err => {
      $log.log('error', err);
      alert('error ' + err.status);
    });
  };

  this.deleteList = function(listId) {
    let url = baseUrl + `/${listId}`;
    $http.delete(url, headers).then(res => {
      $log.log('success', res.data);
    })
    .catch( err => {
      $log.error('error', err);
      alert('error ' + err.status);
    });
  }
}
