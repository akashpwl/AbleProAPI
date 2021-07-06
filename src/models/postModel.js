const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
      },
      caption: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'Post',
      timestamps: true
    }
  );
};
