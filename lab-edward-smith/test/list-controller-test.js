'use strict';

describe('testing list controller', function() {
  beforeEach(() => {
    angular.mock.module('crudApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.listCtrl = new $controller('ListController');
      this.$httpBackend = $httpBackend;
    });
  });

  it('should create a list', () => {
    let url = 'http://localhost:3000/api/list';
    let requestData = {name: 'Chops'};
    this.$httpBackend.expectPost(url, requestData)
      .respond(200, {
        name: 'Chops',
        _id: '1234'
        __v: 0,
        notes: []
      });

      this.listCtrl.createList(requestData);
      this.$httpBackend.flush();
  })
})
