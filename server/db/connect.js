const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async (url) => {
  const connected = await mongoose.connect(url);
  if (connected) {
    console.log('Connected to DB successfully');
    return connected;
  }
  console.log('Some error occured while connecting to DB');
};

module.exports = connectDB;
