import React, { useState } from 'react';
import Square from './Square';
import './TicTacToeCSS.css';
import ComputerPlayer from './ComputerPlayer';

const TicTacToe = () => {
  const [player1] = useState('player');
  const [player2, setPlayer2] = useState('computer');
  const [started, setStarted] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [message, setMessage] = useState('');
  const winningCombinations = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // columns
    [0, 4, 8],
    [2, 4, 6] // diagonals
  ];

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
    if (!started || message) {
      return;
    }
    const index = row * 3 + col;
    console.log(`Square clicked: row ${row}, col ${col}, index ${index}`);
    if (board[index] === null) {
      // Create a new board with the new move
      let newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      // Check if the current player has won the game
      checkWinLoss(newBoard);
      // if the other player is the computer, make a move for the computer
      if ((currentPlayer === 'X' && player2 === 'computer') || (currentPlayer === 'O' && player1 === 'computer')) {
        console.log('currentPlayer before setCurrentPlayer:', currentPlayer);
        newBoard = ComputerPlayer.makeMove(newBoard);
        setBoard(newBoard);
        // check if the computer has won
        checkWinLoss(newBoard);
      }
      // only switch to the other player if the other player is not the computer
      if ((currentPlayer === 'X' && player2 !== 'computer') || (currentPlayer === 'O' && player1 !== 'computer')) {
        console.log('currentPlayer before setCurrentPlayer:', currentPlayer);
        setCurrentPlayer(prevPlayer => (prevPlayer === 'X' ? 'O' : 'X'));
      }
      
    }
  };

  const checkWin = currentBoard => {
    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c];
    });
  };

  const checkWinLoss = newBoard => {
    if (checkWin(newBoard)) {
      setStarted(false);
      setMessage(`Player ${currentPlayer} has won the game!`);
    } else if (newBoard.every(square => square !== null)) {
      setStarted(false);
      setMessage(`The game is a draw!`);
    }
  };

  const renderGameBoard = () => {
    return (
      <div className="gameboard">
        {[0, 1, 2].map(row => (
          <div className="gameboard-row">
            {[0, 1, 2].map(col => (
              <Square
                value={board[row * 3 + col]}
                onClick={() => handleSquareClick(row, col)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {renderGameBoard()}
      {message && <p>{message}</p>}
      <div className="button-container">
        <button>{player1}</button>
        <span className="vs">vs</span>
        <button onClick={handlePlayer2Click}>{player2}</button>
      </div>
      <button onClick={handleStartClick}>{started ? 'Reset' : 'Start'}</button>
    </div>
  );
};

export default TicTacToe;


