'use strict';

describe('testing controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($controller, $httpBackend) => {
      this.gameCtrl = $controller('GameController');
      this.$httpBackend = $httpBackend;
    });
  });

  beforeEach(() => {
    this.gameCtrl.history = [];
    this.gameCtrl.palyer = {
      name: 'slug',
      location: 'roomA'
    };
  });

  it('should change rooms', () => {
    this.gameCtrl.moveDirection('east');
    expect(this.gameCtrl.player.location).toBe('roomB');
  });

  it('should create new player on signup', () => {
    this.playerCtrl.signUp({name: 'goo'});
    expect(this.playerCtrl.player.name).toBe('goo');
  });

  it('should create a new monster on submit', () => {
    this.monsterCtrl.submit({name: 'Ultra Lord'});
    expect(this.monsterCtrl.monster.name).toBe('Ultra Lord');
  });

  it('should create a list', () => {
    let url = 'http://localhost:3000/api/list';
    let requestData = {name: 'example name'};
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    this.$httpBackend.expectPOST(url, requestData, headers)
    .respond(200, {
      name: 'test name',
      _id: 'dfliisdjflsdhf',
      __v: 0,
      notes: []
    });

    this.listCtrl.createList(requestData);
    this.$httpBackend.flush();
  });
});
