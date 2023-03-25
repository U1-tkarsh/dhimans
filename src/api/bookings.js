const express = require('express');
const { getDb } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const bookings = await getDb().collection('bookings').find().toArray();

  res.send(bookings);
});

router.post('/', async (req, res) => {
  const { seats } = req.body;

  const result = await getDb().collection('bookings').insertOne({
    seats,
  });

  res.send(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await getDb()
    .collection('bookings')
    .deleteOne({ _id: getDb().ObjectId(id) });

  res.send(result);
});

module.exports = router;
