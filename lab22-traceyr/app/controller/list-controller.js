'use strict';

const angular = require('angular');
const lab22 = angular.module.('lab22');

lab22.controller('ListController', ['$log', '$http', ListController]);

function ListController($log, $http){
  this.lists = [];
  let baseUrl = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Accept': 'application/json',
    }
  };

  this.createList = function(list){
    $log.debug('listCtrl.createList');
    $http.post(baseUrl, list, config)
      .then( (res)=>{
        $log.log('success!', res.data);
        this.lists.push({id: this.lists.length, title: this.lists.title, body: this.lists.body});
      })
      .catch((err)=>{
        $log.error('error!', err);
        alert('EHHHHHHHHHHH');
      });
  }
}
