'use strict';

describe('testing list-controller', function() {
  beforeEach(() => {
    angular.mock.module('noteApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.listCtrl = new $controller('ListController');
      this.$httpBackend = $httpBackend;
    });
  });

  it('testing createList', () => {
    const url = 'http://localhost:3000/api/list';
    const requestData = { name: 'example name' };
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    this.$httpBackend.expectPOST(url, requestData, headers)
    .respond(200, {
      _id: '57a10f8653481f70fc61f71d',
      __v: 0,
      name: requestData.name,
      notes: []
    });

    this.listCtrl.createList(requestData);
    this.$httpBackend.flush();
    console.log(this.listCtrl.lists);
  });

  it('testing fetchList', () => {
    const url = 'http://localhost:3000/api/list';
    const requestData = { name: 'example name' };
    const postResponseHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const getResponseHeaders = {
      'Accept': 'application/json',
    };

    this.$httpBackend.expectPOST(url, requestData, postResponseHeaders)
    .respond(200, {
      _id: '57a10f8653481f70fc61f71d',
      __v: 0,
      name: requestData.name,
      notes: []
    });

    this.$httpBackend.expectGET(url, getResponseHeaders)
    .respond(200,
      [
        {
          _id: '57a10f8653481f70fc61f71d',
          __v: 0,
          name: requestData.name,
          notes: [],
        },
      ]
    );

    this.listCtrl.createList(requestData);
    this.listCtrl.fetchList();
    this.$httpBackend.flush();
  });

  it('testing deleteList', () => {
    const url = 'http://localhost:3000/api/list';
    const deleteId = 12345;
    const deleteUrl = `${url}/${deleteId}`;
    const requestData = { name: 'example name' };
    const postResponseHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const deleteResponseHeaders = {
      'Accept': 'application/json',
    };

    this.$httpBackend.expectPOST(url, requestData, postResponseHeaders)
    .respond(200, {
      _id: '57a10f8653481f70fc61f71d',
      __v: 0,
      name: requestData.name,
      notes: []
    });

    this.$httpBackend.expectDELETE(deleteUrl, deleteResponseHeaders)
    .respond(204, {
      message: 'successfully deleted',
    });

    this.listCtrl.createList(requestData);
    this.listCtrl.deleteList(deleteId);
    this.$httpBackend.flush();
  });
});
