'use strict';

describe('testing list-controller', function(){

  beforeEach(() => {
    angular.mock.module('lab22');
    angular.mock.inject(($controller, $httpBackend) => {
      this.listCtrl = new $controller('ListController');
      this.$httpBackend = $httpBackend;
    });
  });

  it('should test creating a list', ()=>{
    let url = 'http://localhost:3000/api/list';
    let requestData = {name: 'testing name'};
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    this.$httpBackend.expectPOST(url, requestData, headers)
    .respond(200, {
      name: 'testing name',
      _id: '1111',
      __v: 0,
      notes: []
    });
    this.listCtrl.createList(requestData);
    this.$httpBackend.flush();
  });

  it('should test getting lists', ()=>{
    let url = 'http://localhost:3000/api/list';
    let getHeader = {
      'Accept': 'application/json'
    };
    this.$httpBackend.expectGET(url, getHeader)
    .respond(200, [
      {
        name: 'testing name',
        _id: '1111',
        __v: 0,
        notes: []
      }
    ]);
    this.listCtrl.getLists();
    this.$httpBackend.flush();
  });

  it('should test deleting a list', ()=>{
    let url = 'http://localhost:3000/api/list/1111';
    let deleteHeader = {
      'Accept': 'application/json'
    };
    this.$httpBackend.expectDELETE(url, deleteHeader)
    .respond(200, {});
    this.listCtrl.deleteList('1111');
    this.$httpBackend.flush();
  });
});
