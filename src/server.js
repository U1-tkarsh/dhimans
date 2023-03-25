const express = require('express');
const cors = require('cors');
const { connectDb } = require('./db');
const bookingsRouter = require('./api/bookings');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/bookings', bookingsRouter);

connectDb(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
