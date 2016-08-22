'use strict';

const angular = require('angular');
const noteApp = angular.module('noteApp');

noteApp.controller('ListController', ['$log', '$http', ListController]);

function ListController($log, $http) {
  const baseUrl = `${__API_URL__}/api/list`;
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
  this.lists = [];
  this.deleted = [];

  this.createList = function(list) {
    $log.debug('listCtrl.createList');
    $http.post(baseUrl, list, config)
    .then(res => {
      $log.log('created', res.data);
      // this.lists.push(res.data);
    })
    .catch(err => {
      $log.log('reject', err);
      alert(err.status + ': ' + err.statusText);
    });
  };

  this.fetchList = function(listId) {
    $log.debug('listCtrl.fetchList');

    const url = (listId) ? baseUrl + `/${listId}` : baseUrl;

    $http.get(url, config)
    .then(res => {
      $log.log('resolve', res.data);
      this.lists = [];
      if (res.data instanceof Array) {
        res.data.forEach((item) => {
          this.lists.push(item);
        });
      } else {
        this.lists.push(res.data);
      }
    })
    .catch(err => {
      $log.log('reject', err);
      alert(err.status + ': ' + err.statusText);
    });
  };

  this.updateList = function(listId, listInfo) {
    $log.debug('listCtrl.updateList');

    const url = baseUrl + `/${listId}`;

    $http.put(url, listInfo, config)
    .then(res => {
      $log.log('updated', res.data);
    })
    .catch(err => {
      $log.log('reject', err);
      alert(err.status + ': ' + err.statusText);
    });
  };

  this.deleteList = function(listId) {
    $log.debug('listCtrl.deleteList');

    const url = baseUrl + `/${listId}`;

    $http.delete(url, config)
    .then(res => {
      $log.log('deleted', res.data);
    })
    .catch(err => {
      $log.log('reject', err);
      alert(err.status + ': ' + err.statusText);
    });
  };
}
