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
    if (!started) {
      return;
    }
    const index = row * 3 + col;
    if (board[index] === null) {
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[index] = currentPlayer;
        return newBoard;
      });
      // Check if the current player has won the game
      if (checkWin(board)) {
        setStarted(false);
        // You can display a message or do something else to indicate that the game has ended
        setMessage(`Player ${currentPlayer} has won the game!`);
      } else {
        // check if the game has ended in a draw
        if (!board.includes(null)) {
          setStarted(false);
          setMessage(`The game has ended in a draw!`);
        }
      }
    }
    // switch to the other player if the game has not ended
    setCurrentPlayer(prevPlayer => prevPlayer === 'X' ? 'O' : 'X');
  };
  



  const checkWin = (currentBoard) => {
    console.log('checkWin called'); // add this line
    // check rows
    for (let i = 0; i < 8; i += 3) {
      if (currentBoard[i] && currentBoard[i] === currentBoard[i + 1] && currentBoard[i] === currentBoard[i + 2]) {
        console.log('returning true'); // add this line
        return true;
      }
    }
    // check columns
    for (let i = 0; i < 3; i++) {
      if (currentBoard[i] && currentBoard[i] === currentBoard[i + 3] && currentBoard[i] === currentBoard[i + 6]) {
        console.log('returning true'); // add this line
        return true;
      }
    }
    // check diagonals
    if (currentBoard[0] && currentBoard[0] === currentBoard[4] && currentBoard[0] === currentBoard[8]) {
      console.log('returning true'); // add this line
      return true;
    }
    if (currentBoard[2] && currentBoard[2] === currentBoard[4] && currentBoard[2] === currentBoard[6]) {
      console.log('returning true'); // add this line
      return true;
    }
    console.log('returning false'); // add this line
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

