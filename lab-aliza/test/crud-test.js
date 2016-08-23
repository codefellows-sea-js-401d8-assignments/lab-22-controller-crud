'use strict';

describe('testing list-controller', function(){
  beforeEach(() => {
    angular.mock.module('listApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.listCtrl = new $controller('ListController');
      this.$httpBackend = $httpBackend;
    });
  });

  it('testing createList', () => {
    let url = 'http://localhost:3000/api/list';
    let requestData = {name: 'example name'};
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    this.$httpBackend.expectPOST(url, requestData, headers)
    .respond(200, {
      name: 'example name',
      _id: '1234',
      __v: 0,
      notes: []
    });
    this.listCtrl.createList(requestData);
    this.$httpBackend.flush();
  });

  it('testing destroyList', () => {
    let url = 'http://localhost:3000/api/list/1234';
    let headers = {
      'Accept': 'application/json'
    };
    this.$httpBackend.expectDELETE(url, headers)
    .respond(200, {});
    this.listCtrl.destroyList('1234');
    this.$httpBackend.flush();
  });

  it('testing getLists', () => {
    let url = 'http://localhost:3000/api/list';
    let requestData = {name: 'another name'};
    let postHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    let getHeaders = {
      'Accept': 'application/json'
    };
    this.$httpBackend.expectPOST(url, requestData, postHeaders)
    .respond(200, {
      _id: '54321',
      __v: 0,
      name: 'another name',
      notes: []
    });
    this.$httpBackend.expectGET(url, getHeaders)
    .respond(200,[
      {
        _id: '54321',
        __v: 0,
        name: 'another name',
        notes: []
      }
    ]);
    this.listCtrl.createList(requestData);
    this.listCtrl.getLists();
    this.$httpBackend.flush();
  });
});
