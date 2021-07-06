
const sequelize = require('./../models/db');
const User = require('./../models/userModel');

exports.getUserDetails = async (id) => {
  return await sequelize.models.About.findOne({ where: { id } });
};


exports.create = async (email, name) => {
  return await sequelize.models.About.create({ email, name });
};

exports.update = async (id, dataObj) => {
  return await sequelize.models.About.update(dataObj, { where: { id } });
};

exports.updateUserName = async (id, name) => {
  const user = await User.findById(id).select('name'); // update name in mongoDb
  user.name= name;
  user.save();
  return user;
}

exports.findUserByEmail = async email => {
  return await sequelize.models.About.findOne({
    where: { email },
    attributes: ['id']
  });
};
