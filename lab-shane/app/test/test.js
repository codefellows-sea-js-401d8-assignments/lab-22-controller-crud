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

    this.$httpBackend.expectDELETE(url + '/' + requestData._id)
      .respond(200);
    this.crudCtrl.delete(requestData._id);
    this.$httpBackend.flush();
  });

  it('testing get all', () => {
    this.$httpBackend.expectGET(url)
      .respond(200);
    this.crudCtrl.getAll();
    this.$httpBackend.flush();
  });

});
