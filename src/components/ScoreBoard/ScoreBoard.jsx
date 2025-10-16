// src/components/ScoreBoard/ScoreBoard.jsx

import React, { useEffect, useState } from 'react';
import './ScoreBoard.css';

/**
 * ScoreBoard Component - Displays current score and best score
 * 
 * @param {Object} props
 * @param {number} props.score - Current game score
 * @param {number} props.bestScore - Best score achieved
 * @param {number} props.moves - Number of moves made
 */
const ScoreBoard = ({ score, bestScore, moves }) => {
  const [scoreIncrease, setScoreIncrease] = useState(0);
  const [prevScore, setPrevScore] = useState(score);

  useEffect(() => {
    if (score > prevScore) {
      const increase = score - prevScore;
      setScoreIncrease(increase);
      setPrevScore(score);

      // Clear the increase display after animation
      const timer = setTimeout(() => {
        setScoreIncrease(0);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (score < prevScore) {
      // Game was reset
      setPrevScore(score);
    }
  }, [score, prevScore]);

  return (
    <div className="scoreboard">
      <div className="score-container">
        <div className="score-box">
          <div className="score-label">Score</div>
          <div className="score-value">{score}</div>
          {scoreIncrease > 0 && (
            <div className="score-increase">+{scoreIncrease}</div>
          )}
        </div>

        <div className="score-box best-score">
          <div className="score-label">Best</div>
          <div className="score-value">{bestScore}</div>
        </div>

        <div className="score-box moves-box">
          <div className="score-label">Moves</div>
          <div className="score-value">{moves}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ScoreBoard);