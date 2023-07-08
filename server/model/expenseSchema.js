const mongoose = require('mongoose');
const today = new Date();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  mode: {
    type: String,
    required: [true, 'Mode is required'],
  },
  desc: {
    type: String,
    required: [true, 'Description is required'],
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
  },
  date: {
    type: Number,
    default: today.getDate(),
  },
  month: {
    type: String,
    default: months[today.getMonth()],
  },
  year: {
    type: Number,
    default: today.getFullYear(),
  },
});

module.exports = mongoose.model('expense', expenseSchema);
