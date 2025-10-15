// src/utils/helpers.js

import { GAME_CONFIG } from './constants';

/**
 * Pure helper functions following functional programming principles
 * No side effects, all functions return new values
 */

/**
 * Creates an empty grid of specified size
 * @param {number} size - Grid dimension (size x size)
 * @returns {Array<Array<number>>} Empty 2D array
 */
export const createEmptyGrid = (size = GAME_CONFIG.DEFAULT_GRID_SIZE) => {
  return Array(size).fill(null).map(() => Array(size).fill(0));
};

/**
 * Deep clones a 2D grid
 * @param {Array<Array<number>>} grid - Grid to clone
 * @returns {Array<Array<number>>} Cloned grid
 */
export const cloneGrid = (grid) => {
  return grid.map(row => [...row]);
};

/**
 * Gets all empty cell positions in the grid
 * @param {Array<Array<number>>} grid - Game grid
 * @returns {Array<{row: number, col: number}>} Array of empty positions
 */
export const getEmptyCells = (grid) => {
  const emptyCells = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }
  return emptyCells;
};

/**
 * Selects a random value (2 or 4) based on probability
 * @returns {number} 2 or 4
 */
export const getRandomTileValue = () => {
  const rand = Math.random();
  return rand < GAME_CONFIG.NEW_TILE_PROBABILITY[2] ? 2 : 4;
};

/**
 * Adds a random tile to the grid at an empty position
 * @param {Array<Array<number>>} grid - Current grid
 * @returns {Array<Array<number>>} New grid with added tile
 */
export const addRandomTile = (grid) => {
  const emptyCells = getEmptyCells(grid);
  
  if (emptyCells.length === 0) {
    return grid;
  }

  const newGrid = cloneGrid(grid);
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = getRandomTileValue();
  
  newGrid[randomCell.row][randomCell.col] = value;
  
  return newGrid;
};

/**
 * Initializes game grid with specified number of random tiles
 * @param {number} size - Grid size
 * @param {number} count - Number of initial tiles
 * @returns {Array<Array<number>>} Initialized grid
 */
export const initializeGrid = (size = GAME_CONFIG.DEFAULT_GRID_SIZE, count = GAME_CONFIG.INITIAL_TILES) => {
  let grid = createEmptyGrid(size);
  
  for (let i = 0; i < count; i++) {
    grid = addRandomTile(grid);
  }
  
  return grid;
};

/**
 * Checks if two grids are equal
 * @param {Array<Array<number>>} grid1 - First grid
 * @param {Array<Array<number>>} grid2 - Second grid
 * @returns {boolean} True if grids are equal
 */
export const areGridsEqual = (grid1, grid2) => {
  if (grid1.length !== grid2.length) return false;
  
  for (let row = 0; row < grid1.length; row++) {
    for (let col = 0; col < grid1[row].length; col++) {
      if (grid1[row][col] !== grid2[row][col]) {
        return false;
      }
    }
  }
  
  return true;
};

/**
 * Checks if the grid has the winning tile
 * @param {Array<Array<number>>} grid - Game grid
 * @param {number} winValue - Winning tile value
 * @returns {boolean} True if winning tile exists
 */
export const hasWinningTile = (grid, winValue = GAME_CONFIG.WIN_TILE_VALUE) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === winValue) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Checks if any moves are possible
 * @param {Array<Array<number>>} grid - Game grid
 * @returns {boolean} True if moves are possible
 */
export const canMove = (grid) => {
  // Check for empty cells
  if (getEmptyCells(grid).length > 0) {
    return true;
  }

  const size = grid.length;

  // Check for possible merges horizontally
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size - 1; col++) {
      if (grid[row][col] === grid[row][col + 1]) {
        return true;
      }
    }
  }

  // Check for possible merges vertically
  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size - 1; row++) {
      if (grid[row][col] === grid[row + 1][col]) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Rotates grid 90 degrees clockwise
 * @param {Array<Array<number>>} grid - Grid to rotate
 * @returns {Array<Array<number>>} Rotated grid
 */
export const rotateGridClockwise = (grid) => {
  const size = grid.length;
  const rotated = createEmptyGrid(size);
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotated[col][size - 1 - row] = grid[row][col];
    }
  }
  
  return rotated;
};

/**
 * Rotates grid 90 degrees counter-clockwise
 * @param {Array<Array<number>>} grid - Grid to rotate
 * @returns {Array<Array<number>>} Rotated grid
 */
export const rotateGridCounterClockwise = (grid) => {
  const size = grid.length;
  const rotated = createEmptyGrid(size);
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotated[size - 1 - col][row] = grid[row][col];
    }
  }
  
  return rotated;
};

/**
 * Generates a unique ID for tiles
 * @returns {string} Unique identifier
 */
export const generateTileId = () => {
  return `tile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};