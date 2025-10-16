// src/components/Tile/Tile.jsx

import React from 'react';
import './Tile.css';
import { TILE_COLORS, TEXT_COLORS } from '../../utils/constants.js';

/**
 * Tile Component - Displays individual game tile
 * Pure functional component with no internal state
 * 
 * @param {Object} props
 * @param {number} props.value - Tile value (0 for empty)
 * @param {number} props.row - Row position
 * @param {number} props.col - Column position
 */
const Tile = ({ value, row, col }) => {
  const isEmpty = value === 0;
  
  // Determine background color based on value
  const backgroundColor = TILE_COLORS[value] || TILE_COLORS[0];
  
  // Determine text color (dark text for light tiles, light text for dark tiles)
  const textColor = value >= 8 ? TEXT_COLORS.dark : TEXT_COLORS.light;
  
  // Calculate font size based on number of digits
  const fontSize = value >= 1000 ? '2rem' : value >= 100 ? '2.5rem' : '3rem';

  const tileStyle = {
    backgroundColor,
    color: textColor,
    fontSize,
  };

  return (
    <div 
      className={`tile ${isEmpty ? 'tile-empty' : 'tile-filled'} tile-${value}`}
      style={tileStyle}
      data-row={row}
      data-col={col}
    >
      {!isEmpty && <span className="tile-value">{value}</span>}
    </div>
  );
};

export default React.memo(Tile);