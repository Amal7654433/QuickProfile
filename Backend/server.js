
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin')
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  // origin: ['http://localhost:3000',process.env.FRONTEND_URL],
  origin: "https://user-management-app-1-bpbc.onrender.com", // Allow only your frontend
    methods: "GET,POST,PUT,DELETE",

}));

app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
app.use(usersRouter)
app.use(adminRouter)
const port = process.env.PORT
app.listen(port, () => {
  console.log(`app running on port ${port}`)
})

