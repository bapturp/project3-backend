require('dotenv').config();
require('./config/dbConfig');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const app = express();

//? Services like render use something called a proxy and you need to add this to your server
app.set('trust proxy', 1);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(process.env.FRONTEND_URL);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  }),
);

app.use('/api/v1', require('./routes/index'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/services', require('./routes/services/services.routes'));
app.use('/api/v1/conversations', require('./routes/conversations/conversations.routes'));

require('./error-handling/index')(app);

module.exports = app;
