// ComputerPlayer.js

const getRandomMove = (board) => {
    const availableSquares = board.filter(square => square === null);
    if (availableSquares.length === 0) {
      return null;
    }
    const index = Math.floor(Math.random() * availableSquares.length);
    return index;
  };
  
  
  const ComputerPlayer = {
    makeMove: (board) => {
      // decide which function to use to get the next move (e.g. getRandomMove or getBestMove)
      // based on the current state of the board
      const index = getRandomMove(board);
      if (board[index] !== null) {
        // the selected square is not empty, return the original board
        return board;
      }
      // update the board with the computer's move
      const newBoard = [...board];
      newBoard[index] = 'O';
      return newBoard;
    }
  };
  
  export default ComputerPlayer;
  