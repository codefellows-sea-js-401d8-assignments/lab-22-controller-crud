'use strict';

describe('testing list-controller', function() {
  beforeEach(() => {
    angular.mock.module('crudApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.crudCtrl = new $controller('CrudController');
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
        notes: [],
      });
    this.crudCtrl.createList(requestData);
    this.$httpBackend.flush();
  });

  it('testing deleteList', () => {
    let url = 'http://localhost:3000/api/list/24';
    let requestData = {name: 'example name', _id: 24, __v: 0, notes: []};
    let headers = {
      'Accept': 'application/json'
    };
    this.$httpBackend.expectDELETE(url, headers, requestData)
    .respond(200, {
      name: 'example name',
      _id: 24,
      __v: 0,
      notes: [],
    });
    this.crudCtrl.deleteList(24);
    this.$httpBackend.flush();
  });

  it('testing getList', () => {
    let url = 'http://localhost:3000/api/list/25';
    let requestData = {name: 'keiran', _id: 25, __v: 0, notes: []};
    let headers = {
      'Accept': 'application/json'
    };
    this.$httpBackend.expectGET(url, headers, requestData)
    .respond(200, {
      name: 'keiran',
      _id: 25,
      __v: 0,
      notes: []
    });
    this.crudCtrl.getList(25);
    this.$httpBackend.flush();
  });
});
