const mongoose = require('mongoose');

const db = "mongodb://localhost:27017";

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB connected');
  } catch(err){
    console.log(err.message);
    process.exit(1);
  }
}
module.exports = connectDB;
