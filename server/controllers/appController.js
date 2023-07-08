const Expense = require('../model/expenseSchema');
const Year = require('../model/yearSchema');

const saveExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    expense
      .save()
      .then(() => res.status(200).json({ msg: 'Record saved successfully.' }))
      .catch((err) => res.status(500).json({ msg: err.message }));
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const fetchExpenseRecords = async (req, res) => {
  try {
    const expenseData = await Expense.find(req.query);
    return res.status(200).json({ expenseData });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const fetchYears = async (req, res) => {
  try {
    const years = await Year.find();
    res.status(200).json({ years });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  saveExpense,
  fetchExpenseRecords,
  fetchYears,
};
