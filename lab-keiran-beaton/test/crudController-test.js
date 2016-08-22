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
    let url = 'http://localhost:3000/api/list';
    let requestData = {name: 'example name'};
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    this.$httpBackend.expectDELETE(url, requestData, headers)
    .respond(200, {
      name: 'example name',
      _id: '1234',
      __v: 0,
      notes: [],
    });
    this.crudCtrl.deleteList(requestData);
    this.$httpBackend.flush();
  });
});
