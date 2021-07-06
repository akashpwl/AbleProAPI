const { Op } = require('sequelize');
const sequelize = require('./../models/db');

exports.follow = async (userId, followingId) => {
  return await sequelize.models.Following.create({ userId, followingId });
};

exports.unFollow = async (userId, followingId) => {
  return await sequelize.models.Following.destroy({
    where: { userId, followingId }
  });
};

exports.getFollowingsCount = async userId => {
  return await sequelize.models.Following.count({
    where: { userId }
  });
};
exports.getFollowersCount = async userId => {
  return await sequelize.models.Following.count({
    where: { followingId: userId }
  });
};

exports.getAllFollowingsList = async userId => {
  const followingsId =  await sequelize.models.Following.findAll({
    where: { userId },
    attributes: ['followingId']
  });

  const IDs = followingsId.map(el => {
    return el.followingId;
  });

  return await sequelize.models.About.findAll({
    where: {
      id: IDs
    },
    attributes: ['id', 'name', 'occupation']
  });
};

exports.notFollowingUsers = async userId => {
  const getAllFollowings =  await sequelize.models.Following.findAll({
    where: { userId },
    attributes: ['followingId']
  });
  const IDs = getAllFollowings.map(el => {
    return el.followingId;
  });
  IDs.push(userId);
  return await sequelize.models.About.findAll({
    where: {
      id: {
        [Op.notIn]: IDs
      }
    },
    attributes: ['id', 'name', 'occupation']
  });
};
