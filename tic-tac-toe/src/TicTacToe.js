import React, { useState } from 'react';
import Square from './Square';
import './TicTacToeCSS.css';


const TicTacToe = () => {
  const [player1, setPlayer1] = useState('player');
  const [player2, setPlayer2] = useState('computer');
  const [started, setStarted] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

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
  };

  const handleResetClick = () => {
    setStarted(false);
  };
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <table className="gameboard">
        <tr>
          <td>
            <Square value={board[0]} />
          </td>
          <td>
            <Square value={board[1]} />
          </td>
          <td>
            <Square value={board[2]} />
          </td>
        </tr>
        <tr>
          <td>
            <Square value={board[3]} />
          </td>
          <td>
            <Square value={board[4]} />
          </td>
          <td>
            <Square value={board[5]} />
          </td>
        </tr>
        <tr>
          <td>
            <Square value={board[6]} />
          </td>
          <td>
            <Square value={board[7]} />
          </td>
          <td>
            <Square value={board[8]} />
          </td>
        </tr>
      </table>
      <div className="button-container">
      <button onClick={handlePlayer1Click}>{player1}</button>
        <span className="vs">vs</span>
        <button onClick={handlePlayer2Click}>{player2}</button>
      </div>
      <button onClick={handleStartClick}>Start</button>
      {started && <p>The game has started!</p>}
      {started && <p>It is player {currentPlayer}'s turn.</p>}
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
};

export default TicTacToe;

