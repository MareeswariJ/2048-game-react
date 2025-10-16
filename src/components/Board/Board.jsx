// src/components/Board/Board.jsx

import React from 'react';
import './Board.css';
import Tile from '../Tile/Tile';
/**
 * Board Component - Displays the game grid
 * Pure functional component that receives grid as prop
 * 
 * @param {Object} props
 * @param {Array<Array<number>>} props.grid - 2D array representing game state
 * @param {number} props.size - Grid size (size x size)
 */
const Board = ({ grid, size }) => {
  return (
    <div 
      className="board-container"
      style={{
        '--grid-size': size,
        background: '#bbada0', /* Classic 2048 brown */

      }}
    >
      <div className="board">
        {grid.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="board-row">
            {row.map((value, colIndex) => (
              <Tile
                key={`tile-${rowIndex}-${colIndex}`}
                value={value}
                row={rowIndex}
                col={colIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Board);