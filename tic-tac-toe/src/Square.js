import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <td className='square-text' onClick={onClick}>
      {value}
    </td>
  );
};

export default Square;
