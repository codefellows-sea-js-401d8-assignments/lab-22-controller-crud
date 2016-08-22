'use strict';

describe('testing controller', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($controller) => {
      this.gameCtrl = $controller('GameController');
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
});
