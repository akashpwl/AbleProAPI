/* eslint-disable global-require */
const { associations } = require('./associations');
const sequelize = require('../config/database');

const modelDefiners = [
  require('./aboutUserModel'),
  require('./postModel'),
  require('./likesModel'),
  require('./followingsModel')
];

// eslint-disable-next-line no-restricted-syntax
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

associations(sequelize);
const fn = async () => {
 await sequelize.sync({ alter: true });
};
fn();
module.exports = sequelize;
