const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const cors = require('cors');
//const { sequelize } = require('./config/database');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');
const sequelize = require('./src/models/db');

//app.use(cors());
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
//   logging: (...msg) => console.log(msg)
// });
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
