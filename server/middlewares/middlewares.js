const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, msg: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(404).json({ success: false, msg: `No user found` });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.redirect('/logout');
    }
    res.status(500).json({ success: false, msg: 'Token verification failed.' });
  }
};
