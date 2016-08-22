'use strict';

const angular = require('angular');
const crudyApp = angular.module('crudyApp');

crudyApp.controller('ListController', ['$log', '$http', ListController]);

function ListController($log, $http) {
  let lc = this;

  lc.lists = [];

  let baseUrl = `${__API_URL__}/api/list/`;
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  lc.getAllLists = function() {
    $http.get(baseUrl, config)
      .then((res) => {
        $log.log('Success!', res.data);
        res.data.forEach((list) => {
          lc.lists.push(list);
        });
      })
      .catch((err) => {
        return err;
      });
  };

  lc.deleteAllLists = function() {
    $http.delete(baseUrl, config)
      .then((res) => {
        $log.log('Success!', res.data);
        lc.lists = [];
      })
      .catch((err) => {
        return err;
      });
  };

  lc.createList = function(listName) {
    $http.post(baseUrl, listName, config)
      .then((res) => {
        $log.log('Success!', res.data);
        lc.lists.push(res.data);
      })
      .catch((err) => {
        return err;
      });
  };

  lc.deleteList = function(listId) {
    $http.delete(baseUrl + listId, config)
      .then((res) => {
        $log.log('Success', res.data);
        lc.lists = lc.lists.filter((list) => {
          return list._id !== listId;
        });
        console.log(lc.lists);
      })
      .catch((err) => {
        return err;
      });
  };
}
