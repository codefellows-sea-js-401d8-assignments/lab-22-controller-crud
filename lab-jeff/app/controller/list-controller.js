'use strict';

const angular = require('angular');
const crudyApp = angular.module('crudyApp');

crudyApp.controller('ListController', ['$http', ListController]);

function ListController($http) {
  let lc = this;

  lc.lists = [];

  let baseUrl = `${__API_URL__}api/list`;
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  lc.createList = function(listName) {
    $http.post(baseUrl, listName, config)
      .then((res) => {
        lc.lists.push(res.data);
      })
      .catch((err) => {
        return err;
      });
  };
}
