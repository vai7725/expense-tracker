const express = require('express');
const router = express.Router();
const controller = require('../controllers/appController');

// modules
router.route('/saveexpense').post(controller.saveExpense);
router.route('/fetchexpenserecord').get(controller.fetchExpenseRecords);
router.route('/fetchyears').get(controller.fetchYears);

// export
module.exports = router;
