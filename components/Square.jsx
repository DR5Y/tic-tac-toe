import React from "react";

const Square = ({ value, onSquareClick, isWinning = false }) => {
    return (
        <button 
            onClick={onSquareClick} 
            className={`square ${isWinning ? 'winning' : ''}`}
        >
            {value}
        </button>
    );
};

export default Square;