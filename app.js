const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
//const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

const AppError = require('./src/utils/appError');
const errorHandler = require('./src/controllers/errorController');
const routes = require('./src/routes/index');

const app = express();
app.use(cors());
//app.use(helmet());
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Methods',
    'GET, PUT, POST, PATCH, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Version, device-id, env, User-IP, x-api-key'
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 500,
  windowMs: 3600000,
  message: 'Too many requests from this IP, try again after an hour'
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', routes);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

module.exports = app;
