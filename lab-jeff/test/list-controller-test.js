'use strict';

describe('testing list-controller', function() {
  beforeEach(() => {
    angular.mock.module('crudyApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.listCtrl = new $controller('ListController');
      this.$httpBackend = $httpBackend;
    });
  });

  it('should create a list', () => {
    let url = 'http://localhost:3000/api/list/';
    let listData = {name: 'test list'};
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    this.$httpBackend.expectPOST(url, listData, headers)
    .respond(200, {
      name: 'test list',
      _id: '12345',
      __v: '0',
      notes: [],
    });

    this.listCtrl.createList(listData);
    this.$httpBackend.flush();

  });

  it('should delete a list', () => {
    this.listCtrl.lists = [
      {
        name: 'test list',
        _id: '12345',
        __v: '0',
        notes: [],
      },
    ];

    let url = 'http://localhost:3000/api/list/';
    let listData = {_id: '12345'};
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    this.$httpBackend.expectDELETE(url + listData, headers)
    .respond(200,
      {
        name: 'test list',
        _id: '12345',
        __v: '0',
        notes: [],
      });

    this.listCtrl.deleteLocalList(listData._id);

    expect(this.listCtrl.lists.length).toEqual(0);
  });

  it('should delete all lists', () => {
    this.listCtrl.lists = [
      {
        name: 'test list',
        _id: '11111',
        __v: '0',
        notes: [],
      },
      {
        name: 'test list 2',
        _id: '22222',
        __v: '0',
        notes: [],
      },
      {
        name: 'test list 3',
        _id: '33333',
        __v: '0',
        notes: [],
      },
    ];

    let url = 'http://localhost:3000/api/list/';
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    this.$httpBackend.expectDELETE(url, headers)
    .respond(200, {
      ok: 1,
      n: 9,
    });

    this.listCtrl.deleteAllLists();

    expect(this.listCtrl.lists.length).toEqual(0);
  });
});
