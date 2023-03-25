import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Seat from './Seat';
import './App.css'

const App = () => {
  const [seats, setSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/bookings');
      console.log('Booked seats:', response.data[0].seats);
      setBookedSeats(response.data[0].seats);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const allSeats = [];

    for (let i = 0; i < 10; i++) {
      allSeats.push({
        id: i + 1,
        booked: bookedSeats.includes(i + 1),
      });
    }

    setSeats(allSeats);
  }, [bookedSeats]);

  const handleSeatClick = seatId => {
    if (!bookedSeats.includes(seatId)) {
      setBookedSeats([...bookedSeats, seatId]);

      axios.post('http://localhost:3000/bookings', {
        seats: [...bookedSeats, seatId],
        
      });
    } else {
      console.log(`Canceling seat ${seatId}`);
      setBookedSeats(bookedSeats.filter(seat => seat !== seatId));

      axios.delete(`http://localhost:3000/bookings/${seatId}`);
    }
  };

  return (
    <div className="container">
      <img
        src="https://static.businessworld.in/article/article_extra_large_image/1609147522_O1aw88_BMS.jpg"
        className="rounded mx-auto d-block"
        alt="..."
      />
      <div className="bg-dark bg-gradient p-3 mb-2 w-100 text-white text-center container-md container-lg">
        Here is available seat number
      </div>
      <div className="seats">
        {seats.map(seat => (
          <Seat
            key={seat.id}
            id={seat.id}
            booked={seat.booked}
            onClick={handleSeatClick}
          />
        ))}
      </div>
      <div className="booked-seats">
        <div className="bg-danger bg-gradient p-3 text-center container-md container-lg mb-2">
        Booked seat
      </div>
        <ul>
          {bookedSeats.map(seat => (
            <li key={seat}>{seat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
