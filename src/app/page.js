"use client";

import { useState } from "react";
import Square from "../../components/Square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  const handleSquareClick = (index) => {
    // Don't allow click if square is already filled or game is won
    if (squares[index] || winner.player) {
      return;
    }

    // Create a copy of the squares array
    const nextSquares = squares.slice();
    
    // Set the current player's mark (X or O)
    nextSquares[index] = xIsNext ? 'X' : 'O';
    
    // Update state
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  // Calculate winner with winning line
  const winner = calculateWinner(squares);
  const isDraw = squares.every(square => square !== null) && !winner.player;

  // Reset game function
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game">
      <div className="game-board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              const isWinningSquare = winner.line.includes(index);
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleSquareClick(index)}
                  isWinning={isWinningSquare}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="game-info">
        {/* Player Indicator */}
        <div className="player-indicator">
          <div className="players">
            <div className={`player-x ${xIsNext ? 'active' : ''}`}>
              X
            </div>
            <div className={`player-o ${!xIsNext ? 'active' : ''}`}>
              O
            </div>
          </div>
        </div>

        {/* Game Status */}
        <div className="status">
          {winner.player ? (
            <div className="winner">
              Winner: Player {winner.player}!
            </div>
          ) : isDraw ? (
            <div className="draw">
              Draw!
            </div>
          ) : (
            <div className="next-player">
              Next: Player {xIsNext ? 'X' : 'O'}
            </div>
          )}
        </div>

        {/* Reset Button */}
        {(winner.player || isDraw) && (
          <button
            onClick={resetGame}
            className="reset-button"
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
}

// Helper function to calculate winner with winning line
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: lines[i] };
    }
  }
  return { player: null, line: [] };
}