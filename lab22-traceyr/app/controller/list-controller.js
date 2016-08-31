'use strict';

const angular = require('angular');
const lab22 = angular.module('lab22');

lab22.controller('ListController', ['$log', '$http', ListController]);

function ListController($log, $http){
  this.lists = [];
  let baseUrl = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  this.createList = function(list){
    console.log(list);
    $log.debug('listCtrl.createList');
    $http.post(baseUrl, list, config)
      .then((res)=>{
        $log.log('success!', res.data);
        this.lists.push(res.data);
        console.log(this.lists);
      })
      .catch((err)=>{
        $log.error('error!', err);
        alert('fuck');
      });
  };

  this.getLists = function() {
    $http.get(baseUrl, config)
      .then((res) => {
        $log.log('Success!', res.data);
        res.data.forEach((list) => {
          this.lists.push(list);
        });
      })
      .catch((err) => {
        $log.log('Error: ', err);
      });
  };
}
