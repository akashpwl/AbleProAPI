function associations(sequelize) {
  const { About, Post, Like, Following } = sequelize.models;

  Following.belongsTo(About, {
    foreignKey: 'userId'
  });
  Following.belongsTo(About, {
    foreignKey: 'followingId'
  });

  // About.hasMany(Post, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // });
  Post.belongsTo(About, {
    foreignKey: 'userId'
  });

  Post.hasMany(Like, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Like.belongsTo(Post, {
    foreignKey: 'postId'
  });
  Like.belongsTo(About, {
    foreignKey: 'userId'
  });
}

module.exports = { associations };
