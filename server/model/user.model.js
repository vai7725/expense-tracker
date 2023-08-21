const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: {
      type: String,
      unique: [true, 'Email must be unique'],
    },
    avatar: String,
    password: {
      type: String,
      select: false,
    },
    loginMedium: {
      type: String,
      default: 'local',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods = {
  generateToken: function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
  },
};

const User = mongoose.model('user', userSchema);

module.exports = User;
