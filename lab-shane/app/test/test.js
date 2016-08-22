'use strict';
const url = 'http://localhost:3000/api/list';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

describe('testing lists', function() {
  beforeEach(() => {
    angular.mock.module('crudApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.crudCtrl = new $controller('CrudController');
      this.$httpBackend = $httpBackend;
    });
  });

  it('testing create', () => {
    let requestData = {
      name: 'batman'
    };

    this.$httpBackend.expectPOST(url, requestData, headers)
      .respond(200, {
        name: 'batman',
        _id: '1111',
        _v: 0,
        notes: []
      });

    this.crudCtrl.create(requestData);
    this.$httpBackend.flush();
  });


  it('testing delete', () => {
    let requestData = {
      _id: '1111'
    };
    this.crudCtrl.create({name: 'batman'});

    this.$httpBackend.expectDELETE(url + '/' + requestData._id, requestData, headers)
      .respond(200, {
        'msg': 'deleted!'
      });
    this.crudCtrl.delete(requestData);
    this.$httpBackend.flush();
  });

  it('testing get all', () => {
    this.$httpBackend.whenGET(url, headers)
      .respond(200, {
        name: 'batman',
        _id: '1111',
        _v: 0,
        notes: []
      });
    this.crudCtrl.getAll();
    this.$httpBackend.flush();
  });



});
