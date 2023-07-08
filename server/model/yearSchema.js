const mongoose = require('mongoose');

const yearSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: [true, 'Value is required'],
    unique: true,
  },
  label: {
    type: Number,
    required: [true, 'Label is required'],
    unique: true,
  },
});

module.exports = mongoose.model('year', yearSchema);
