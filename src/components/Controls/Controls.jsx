// src/components/Controls/Controls.jsx

import React from 'react';
import './Controls.css';
import { DIRECTIONS } from '../../utils/constants';

/**
 * Controls Component - Game control buttons
 * 
 * @param {Object} props
 * @param {Function} props.onRestart - Callback for restart button
 * @param {Function} props.onMove - Callback for directional moves
 * @param {Function} props.onNewGame - Callback for new game
 * @param {boolean} props.gameOver - Whether game is over
 * @param {boolean} props.gameWon - Whether game is won
 */
const Controls = ({ onRestart, onMove, onNewGame, gameOver, gameWon }) => {
  const handleDirectionClick = (direction) => {
    if (!gameOver && !gameWon) {
      onMove(direction);
    }
  };

  return (
    <div className="controls">
      <div className="button-group">
        <button 
          className="btn btn-primary"
          onClick={onRestart}
          aria-label="Restart game"
        >
          🔄 Restart
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={onNewGame}
          aria-label="Start new game"
        >
          🎮 New Game
        </button>
      </div>

      <div className="direction-controls">
        <div className="direction-row">
          <button
            className="btn btn-direction"
            onClick={() => handleDirectionClick(DIRECTIONS.UP)}
            disabled={gameOver || gameWon}
            aria-label="Move up"
          >
            ↑
          </button>
        </div>
        <div className="direction-row">
          <button
            className="btn btn-direction"
            onClick={() => handleDirectionClick(DIRECTIONS.LEFT)}
            disabled={gameOver || gameWon}
            aria-label="Move left"
          >
            ←
          </button>
          <button
            className="btn btn-direction"
            onClick={() => handleDirectionClick(DIRECTIONS.DOWN)}
            disabled={gameOver || gameWon}
            aria-label="Move down"
          >
            ↓
          </button>
          <button
            className="btn btn-direction"
            onClick={() => handleDirectionClick(DIRECTIONS.RIGHT)}
            disabled={gameOver || gameWon}
            aria-label="Move right"
          >
            →
          </button>
        </div>
      </div>

      <div className="instructions">
        <p className="keys">Use arrow keys or buttons to play</p>
        <p className="keys-hint">← ↑ → ↓ or WASD</p>
      </div>
    </div>
  );
};

export default React.memo(Controls);