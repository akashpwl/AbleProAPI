const { Sequelize } = require('sequelize');

module.exports = new Sequelize(process.env.DEV_DATABASE_URL, {
  logging: false
});
