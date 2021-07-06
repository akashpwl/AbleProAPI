//const Like = require('./../models/likesModel');
const sequelize = require('./../models/db');

exports.likePost = async (userId, PostId) => {
  return await sequelize.models.Like.create({ userId, PostId });
};

exports.unlikePost = async (userId, PostId) => {
  return await sequelize.models.Like.destroy({ where: { userId, PostId } });
};
