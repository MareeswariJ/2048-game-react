// src/utils/gameLogic.js

import { 
  cloneGrid, 
  areGridsEqual, 
  addRandomTile,
  rotateGridClockwise,
  rotateGridCounterClockwise 
} from './helpers';
import { DIRECTIONS } from './constants';

/**
 * Core game logic following functional programming principles
 * All functions are pure - no mutations, no side effects
 */

/**
 * Slides and merges a single row to the left
 * @param {Array<number>} row - Row to process
 * @returns {{newRow: Array<number>, score: number}} Processed row and score gained
 */
const slideAndMergeRow = (row) => {
  // Filter out zeros (empty cells)
  const filtered = row.filter(cell => cell !== 0);
  const newRow = [];
  let score = 0;
  let i = 0;

  while (i < filtered.length) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      // Merge tiles
      const mergedValue = filtered[i] * 2;
      newRow.push(mergedValue);
      score += mergedValue;
      i += 2; // Skip next tile as it's merged
    } else {
      // No merge, just move
      newRow.push(filtered[i]);
      i += 1;
    }
  }

  // Fill remaining spaces with zeros
  while (newRow.length < row.length) {
    newRow.push(0);
  }

  return { newRow, score };
};

/**
 * Moves tiles left on the grid
 * @param {Array<Array<number>>} grid - Current grid
 * @returns {{grid: Array<Array<number>>, score: number}} New grid and score
 */
const moveLeft = (grid) => {
  const newGrid = [];
  let totalScore = 0;

  for (let row of grid) {
    const { newRow, score } = slideAndMergeRow(row);
    newGrid.push(newRow);
    totalScore += score;
  }

  return { grid: newGrid, score: totalScore };
};

/**
 * Moves tiles right on the grid
 * @param {Array<Array<number>>} grid - Current grid
 * @returns {{grid: Array<Array<number>>, score: number}} New grid and score
 */
const moveRight = (grid) => {
  const newGrid = [];
  let totalScore = 0;

  for (let row of grid) {
    // Reverse, slide left, then reverse back
    const reversed = [...row].reverse();
    const { newRow, score } = slideAndMergeRow(reversed);
    newGrid.push(newRow.reverse());
    totalScore += score;
  }

  return { grid: newGrid, score: totalScore };
};

/**
 * Moves tiles up on the grid
 * @param {Array<Array<number>>} grid - Current grid
 * @returns {{grid: Array<Array<number>>, score: number}} New grid and score
 */
const moveUp = (grid) => {
  // Rotate counter-clockwise, move left, rotate back clockwise
  const rotated = rotateGridCounterClockwise(grid);
  const { grid: movedGrid, score } = moveLeft(rotated);
  const finalGrid = rotateGridClockwise(movedGrid);

  return { grid: finalGrid, score };
};

/**
 * Moves tiles down on the grid
 * @param {Array<Array<number>>} grid - Current grid
 * @returns {{grid: Array<Array<number>>, score: number}} New grid and score
 */
const moveDown = (grid) => {
  // Rotate clockwise, move left, rotate back counter-clockwise
  const rotated = rotateGridClockwise(grid);
  const { grid: movedGrid, score } = moveLeft(rotated);
  const finalGrid = rotateGridCounterClockwise(movedGrid);

  return { grid: finalGrid, score };
};

/**
 * Main move function that handles all directions
 * @param {Array<Array<number>>} grid - Current grid
 * @param {string} direction - Direction to move (UP, DOWN, LEFT, RIGHT)
 * @returns {{grid: Array<Array<number>>, score: number, moved: boolean}} Result object
 */
export const move = (grid, direction) => {
  const originalGrid = cloneGrid(grid);
  let result;

  switch (direction) {
    case DIRECTIONS.LEFT:
      result = moveLeft(grid);
      break;
    case DIRECTIONS.RIGHT:
      result = moveRight(grid);
      break;
    case DIRECTIONS.UP:
      result = moveUp(grid);
      break;
    case DIRECTIONS.DOWN:
      result = moveDown(grid);
      break;
    default:
      return { grid: originalGrid, score: 0, moved: false };
  }

  // Check if the move actually changed the grid
  const moved = !areGridsEqual(originalGrid, result.grid);

  return {
    grid: result.grid,
    score: result.score,
    moved
  };
};

/**
 * Processes a move and adds a new tile if the move was valid
 * @param {Array<Array<number>>} grid - Current grid
 * @param {string} direction - Direction to move
 * @returns {{grid: Array<Array<number>>, score: number, moved: boolean}} Result object
 */
export const processMove = (grid, direction) => {
  const moveResult = move(grid, direction);

  if (moveResult.moved) {
    // Add a new random tile after successful move
    const gridWithNewTile = addRandomTile(moveResult.grid);
    return {
      grid: gridWithNewTile,
      score: moveResult.score,
      moved: true
    };
  }

  return moveResult;
};

/**
 * Calculates the best possible move using a simple heuristic
 * Useful for hint system or AI player
 * @param {Array<Array<number>>} grid - Current grid
 * @returns {string} Best direction
 */
export const calculateBestMove = (grid) => {
  const directions = [DIRECTIONS.LEFT, DIRECTIONS.RIGHT, DIRECTIONS.UP, DIRECTIONS.DOWN];
  let bestDirection = directions[0];
  let bestScore = -1;

  for (let direction of directions) {
    const result = move(grid, direction);
    if (result.moved && result.score > bestScore) {
      bestScore = result.score;
      bestDirection = direction;
    }
  }

  return bestDirection;
};

/**
 * Evaluates the game state
 * @param {Array<Array<number>>} grid - Current grid
 * @returns {number} Heuristic score for the board state
 */
export const evaluateBoard = (grid) => {
  let score = 0;
  const size = grid.length;

  // Reward empty cells
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === 0) {
        score += 100;
      }
    }
  }

  // Reward monotonicity (tiles in order)
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size - 1; col++) {
      if (grid[row][col] >= grid[row][col + 1]) {
        score += 10;
      }
    }
  }

  return score;
};