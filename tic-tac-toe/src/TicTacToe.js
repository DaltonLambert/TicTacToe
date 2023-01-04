import React, { useState } from 'react';
import Square from './Square';
import './TicTacToeCSS.css';



const TicTacToe = () => {
  const [player1, setPlayer1] = useState('player');
  const [player2, setPlayer2] = useState('computer');
  const [started, setStarted] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [message, setMessage] = useState('');
  const winningCombinations = [  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
  [0, 4, 8], [2, 4, 6]  // diagonals
];

  const handlePlayer1Click = () => {
    setPlayer1(player1 === 'player' ? 'computer' : 'player');
  };

  const handlePlayer2Click = () => {
    setPlayer2(player2 === 'player' ? 'computer' : 'player');
  };

  const handleStartClick = () => {
    setStarted(true);
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setMessage('');
  };

  const handleSquareClick = (row, col) => {
    if (!started || player1 !== 'player' || player2 !== 'player') {
      return;
    }
    const index = row * 3 + col;
    if (board[index] === null) {
      // Create a new board with the new move
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      // Check if the current player has won the game
      if (checkWin(newBoard)) {
        setStarted(false);
        // You can display a message or do something else to indicate that the game has ended
        setMessage(`Player ${currentPlayer} has won the game!`);
      } else {
        
        // check if the game has ended in a draw
        if (!newBoard.includes(null)) {
          setStarted(false);
          setMessage(`The game has ended in a draw!`);
        }
      }
    }
    // switch to the other player if the game has not ended
    setCurrentPlayer(prevPlayer => prevPlayer === 'X' ? 'O' : 'X');
  };
  
  
  
  const checkWin = (currentBoard) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return true;
      }
    }
    return false;
  }
  
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <table className="gameboard">
  {[0, 1, 2].map(row => (
    <tr>
      {[0, 1, 2].map(col => (
        <td>
          <Square
            value={board[row * 3 + col]}
            onClick={() => handleSquareClick(row, col)}
          />
        </td>
      ))}
    </tr>
  ))}
</table>
{message && <p>{message}</p>}
      <div className="button-container">
      <button onClick={handlePlayer1Click}>{player1}</button>
        <span className="vs">vs</span>
        <button onClick={handlePlayer2Click}>{player2}</button>
      </div>
      <button onClick={handleStartClick}>{started ? 'Reset' : 'Start'}</button>
      {started && <p>The game has started!</p>}
      {started && <p>It is player {currentPlayer}'s turn.</p>}
    </div>
  );
};

export default TicTacToe;

