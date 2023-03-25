import React, { useState } from 'react';
import Seat from './Seat';

const Theatre = () => {
  const [bookedSeats, setBookedSeats] = useState([]);

  return (
    <div className="theatre">
      <div className="screen">SCREEN</div>
      <div className="seats">
        {[...Array(10)].map((_, index) => (
          <Seat
            key={index}
            id={index + 1}
            bookedSeats={bookedSeats}
            setBookedSeats={setBookedSeats}
          />
        ))}
      </div>
      <div className="booked-seats">
        {bookedSeats.length > 0 && (
          <div>
            <h3>Booked Seats:</h3>
            <ul>
              {bookedSeats.map(seatId => (
                <li key={seatId}>{seatId}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Theatre;
