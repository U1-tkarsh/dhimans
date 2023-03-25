const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

const connectDb = callback => {
  client.connect(err => {
    if (err) {
      console.log('Error connecting to MongoDB:', err);
      process.exit(1);
    }

    console.log('Connected to MongoDB');

    db = client.db(process.env.MONGODB_DBNAME);

    callback();
  });
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  return db;
};

module.exports = {
  connectDb,
  getDb,
};
