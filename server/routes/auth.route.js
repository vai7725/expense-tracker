const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  authUser,
  logOutUser,
  getUser,
} = require('../controllers/authController');
const { verifyToken } = require('../middlewares/middlewares');

const router = express.Router();

require('../config/passport');
router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router
  .route('/google/callback')
  .get(passport.authenticate('google', { failureRedirect: '/' }), authUser);

router.route('/logout').get(logOutUser);
router.route('/user').get(verifyToken, getUser);

module.exports = router;
