// ComputerPlayer.js

const getRandomMove = (board) => {
  let availableSquares = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      availableSquares.push(i);
    }
  }
  if (availableSquares.length === 0) {
    return null;
  }
  const index = availableSquares[Math.floor(Math.random() * availableSquares.length)];
  return index;
};

  
  
  const ComputerPlayer = {
    makeMove: (board) => {
      // decide which function to use to get the next move (e.g. getRandomMove or getBestMove)
      // based on the current state of the board
      let index;
      do {
        index = getRandomMove(board);
        console.log(`Computer move: index ${index}`);
      } while (board[index] !== null && index !== null);
      if (index === null) {
        // no available squares, return the original board
        return board;
      }
      // update the board with the computer's move
      const newBoard = [...board];
      newBoard[index] = 'O';
      return newBoard;
    }
  };
  
  
  export default ComputerPlayer;
  