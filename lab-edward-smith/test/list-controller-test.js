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
    let url = 'http://localhost:3000/api/list/';
    let requestData = {name: 'Chops'};
    this.$httpBackend.expectPOST(url, requestData)
      .respond(200, {
        name: 'Chops',
        _id: '1234',
        __v: 0,
        notes: []
      });
    this.listCtrl.createList(requestData);
    this.$httpBackend.flush();
    expect(this.listCtrl.lists.length).toBe(1);
  });

  it('should get the list of notes', () => {
    this.$httpBackend.expectGET(this.url)
      .respond(200, [{
        name: 'Chops',
        id: '1234',
        __v: 0,
        notes: []
      }]);

    this.listCtrl.getList();
    this.$httpBackend.flush();
    expect(this.listCtrl.lists[0].name).toBe('Chops');
  });

  it('should delete an item from the list', () => {
    this.$httpBackend.expectDELETE(this.url)
      .respond(200, {});
    this.listCtrl.deleteListItem('1234');
    this.$httpBackend.flush();
    expect(this.listCtrl.lists.length).toBe(0);
  });
});
