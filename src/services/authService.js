const User = require('./../models/userModel');

exports.login = async email => {
  return await User.findOne({ email }).select('+password');
};

exports.signup = async userData => {
  return await User.create(userData); // moongoose user
};
exports.findUserbyId = async id => {
  return await User.findById(id);
};
exports.findOneUser = async fields => {
  return await User.findOne(fields);
};
exports.updatePassword = async id => {
  return await User.findById(id).select('+password');
};
