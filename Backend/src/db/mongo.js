const mongoose = require('mongoose');

const connect = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/Ai-Code-Reviewer';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // fail fast if Mongo isn't available
    });
    console.log('MongoDB connected');
  } catch (err) {
    // Do not exit process in dev — allow server to run without DB for local testing.
    console.warn('Warning: Could not connect to MongoDB. Continuing without DB. Error:', err.message);
  }
};

module.exports = connect;