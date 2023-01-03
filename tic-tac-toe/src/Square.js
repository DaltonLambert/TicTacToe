import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <td onClick={onClick}>
      {value}
    </td>
  );
};

export default Square;
