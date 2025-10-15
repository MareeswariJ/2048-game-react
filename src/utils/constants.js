// src/utils/constants.js

/**
 * Game Configuration Constants
 * Centralized configuration for easy modification
 */

export const GAME_CONFIG = {
  DEFAULT_GRID_SIZE: 4,
  MIN_GRID_SIZE: 3,
  MAX_GRID_SIZE: 8,
  INITIAL_TILES: 2,
  WIN_TILE_VALUE: 2048,
  NEW_TILE_PROBABILITY: {
    2: 0.9,  // 90% chance for tile value 2
    4: 0.1   // 10% chance for tile value 4
  }
};

export const TILE_COLORS = {
  0: '#cdc1b4',
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e',
  4096: '#3c3a32',
  8192: '#3c3a32'
};

export const TEXT_COLORS = {
  light: '#776e65',
  dark: '#f9f6f2'
};

export const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

export const KEY_CODES = {
  37: DIRECTIONS.LEFT,  // Arrow Left
  38: DIRECTIONS.UP,    // Arrow Up
  39: DIRECTIONS.RIGHT, // Arrow Right
  40: DIRECTIONS.DOWN,  // Arrow Down
  65: DIRECTIONS.LEFT,  // A
  87: DIRECTIONS.UP,    // W
  68: DIRECTIONS.RIGHT, // D
  83: DIRECTIONS.DOWN   // S
};

export const GAME_STATUS = {
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST'
};

export const ANIMATION_DURATION = 150; // milliseconds