import React from 'react';

const Seat = ({ id, booked, onClick }) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div
      className={`seat ${booked ? 'booked' : ''}`}
      onClick={handleClick}
    >
      {id}
    </div>
  );
};

export default Seat;
