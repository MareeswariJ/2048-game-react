// src/App.jsx

import { useState, useEffect, useCallback, useRef } from 'react';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import Controls from './components/Controls/Controls';
import { initializeGrid, canMove, hasWinningTile } from './utils/helpers';
import { processMove } from './utils/gameLogic';
import { GAME_CONFIG, KEY_CODES, GAME_STATUS } from './utils/constants';
import './App.css';

/**
 * Main App Component - Game State Management
 * Implements functional programming principles with hooks
 */
function App() {
  // Game state
  const [grid, setGrid] = useState(() => initializeGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    // Load best score from memory (not localStorage per restrictions)
    return 0;
  });
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);
  const [gridSize, setGridSize] = useState(GAME_CONFIG.DEFAULT_GRID_SIZE);

  // Use ref to track best score in memory
  const bestScoreRef = useRef(bestScore);

  // Update best score when score changes
  useEffect(() => {
    if (score > bestScoreRef.current) {
      bestScoreRef.current = score;
      setBestScore(score);
    }
  }, [score]);

  // Check game status after each move
  useEffect(() => {
    if (gameStatus === GAME_STATUS.PLAYING) {
      if (hasWinningTile(grid)) {
        setGameStatus(GAME_STATUS.WON);
      } else if (!canMove(grid)) {
        setGameStatus(GAME_STATUS.LOST);
      }
    }
  }, [grid, gameStatus]);

  /**
   * Handles move in any direction
   * Pure function approach - no direct state mutation
   */
  const handleMove = useCallback((direction) => {
    if (gameStatus !== GAME_STATUS.PLAYING) {
      return;
    }

    const result = processMove(grid, direction);

    if (result.moved) {
      setGrid(result.grid);
      setScore(prevScore => prevScore + result.score);
      setMoves(prevMoves => prevMoves + 1);
    }
  }, [grid, gameStatus]);

  /**
   * Handles keyboard input
   */
  const handleKeyDown = useCallback((event) => {
    const direction = KEY_CODES[event.keyCode];
    
    if (direction) {
      event.preventDefault();
      handleMove(direction);
    }
  }, [handleMove]);

  /**
   * Restart game with same grid size
   */
  const handleRestart = useCallback(() => {
    setGrid(initializeGrid(gridSize));
    setScore(0);
    setMoves(0);
    setGameStatus(GAME_STATUS.PLAYING);
  }, [gridSize]);

  /**
   * Start completely new game (can change size in future)
   */
  const handleNewGame = useCallback(() => {
    handleRestart();
  }, [handleRestart]);

  /**
   * Continue playing after winning
   */
  const handleContinue = useCallback(() => {
    setGameStatus(GAME_STATUS.PLAYING);
  }, []);

  // Setup keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">2048</h1>
        <p className="app-subtitle">Join the tiles, get to 2048!</p>
      </header>

      <ScoreBoard 
        score={score} 
        bestScore={bestScore} 
        moves={moves}
      />

      <Board 
        grid={grid} 
        size={gridSize}
      />

      <Controls
        onRestart={handleRestart}
        onMove={handleMove}
        onNewGame={handleNewGame}
        gameOver={gameStatus === GAME_STATUS.LOST}
        gameWon={gameStatus === GAME_STATUS.WON}
      />

      {/* Game Over Modal */}
      {gameStatus === GAME_STATUS.LOST && (
        <div className="modal-overlay">
          <div className="modal game-over">
            <h2>Game Over!</h2>
            <p className="modal-score">Final Score: {score}</p>
            <p className="modal-message">No more moves available</p>
            <button className="btn btn-primary" onClick={handleRestart}>
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Game Won Modal */}
      {gameStatus === GAME_STATUS.WON && (
        <div className="modal-overlay">
          <div className="modal game-won">
            <h2>🎉 You Win! 🎉</h2>
            <p className="modal-score">Score: {score}</p>
            <p className="modal-message">You reached 2048!</p>
            <div className="modal-buttons">
              <button className="btn btn-primary" onClick={handleContinue}>
                Continue
              </button>
              <button className="btn btn-secondary" onClick={handleRestart}>
                New Game
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>
          Built with React & Functional Programming Principles
        </p>
        
      </footer>
    </div>
  );
}

export default App;