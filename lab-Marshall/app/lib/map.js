'use strict';

module.exports = {
  'The Lobby': {
    north: 'wall',
    east: 'The Fun Room',
    south: 'The Room of Doom',
    west: 'wall'
  },
  'The Fun Room': {
    north: 'wall',
    east: 'wall',
    south: 'Moose Room',
    west: 'The Lobby'
  },
  'The Room of Doom': {
    north: 'The Lobby',
    east: 'Moose Room',
    south: 'wall',
    west: 'wall'
  },
  'Moose Room': {
    north: 'The Fun Room',
    east: 'wall',
    south: 'wall',
    west: 'The Room of Doom'
  }
};
