const { Sequelize, DataTypes } = require('sequelize');

//const { sequelize } = require('./../../config/database');
module.exports = sequelize => {
  sequelize.define(
    'Like',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      }
    },
    {
      tableName: 'Like',
      timestamps: true
    }
  );
};
