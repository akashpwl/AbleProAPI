const sequelize = require('./../models/db');
const followService = require('./followService');

exports.createPost = async (userId, url, caption) => {
  return await sequelize.models.Post.create({ userId, url, caption });
};

exports.getAllPost = async userId => {
  let followingsList =  await sequelize.models.Following.findAll({
    where: { userId },
    attributes: ['followingId']
  });
  followingsList = followingsList.map(el => el.dataValues.followingId); //map(el => el.dataValues.followingId);
  followingsList.push(userId);

  return await sequelize.models.Post.findAll({
    where: { 
      userId: followingsList
    },
    order: [['createdAt', 'DESC']],
    include: [
      { model: sequelize.models.About, attributes: ['name'] },
      { model: sequelize.models.Like, attributes: ['PostId', 'userId'] }
    ]
  });
};
