// packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');

// modules
const appRoutes = require('./routes/route');
const connectDB = require('./db/connect');
const authRoutes = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

// Environment Variables
const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(cookieParser());
app.use('/api', appRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Home route');
});

const start = async () => {
  try {
    await connectDB(dbURI);
    app.listen(port, () => console.log(`App started listening at ${port}`));
  } catch (error) {
    console.log('The error is', error);
  }
};

start();
