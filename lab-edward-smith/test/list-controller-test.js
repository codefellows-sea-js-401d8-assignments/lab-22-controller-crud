'use strict';

describe('testing list controller', function() {
  beforeEach(() => {
    angular.mock.module('crudApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.listCtrl = new $controller('ListController');
      this.$httpBackend = $httpBackend;
    });
  });

  beforeEach(() => {
    this.url = 'http://localhost:3000/api/list/';
    this.requestData = {name: 'Chops'};
    this.$httpBackend.expectPOST(this.url, this.requestData)
      .respond(200, {
        name: 'Chops',
        _id: '1234',
        __v: 0,
        notes: []
      });
  })

  it('should create a list', () => {
      this.listCtrl.createList(this.requestData);
      this.$httpBackend.flush();
      expect(this.listCtrl.lists.length).toBe(1)
  })

  it('should get the list of notes', () => {
    this.$httpBackend.expectGET(this.url)
      .respond(200)
    this.listCtrl.getList();
    console.log(this.listCtrl.lists)
  })

  // it('should delete an item from the list', () => {
  //   this.$httpBackend.expectDELETE(this.url)
  //     .respond(200);
  //   this.listCtrl.createList(this.requestData);
  //   this.listCtrl.deleteListItem('1234');
  //   this.$httpBackend.flush();
  //   expect(this.listCtrl.lists).toBe(0)
  // })
})
