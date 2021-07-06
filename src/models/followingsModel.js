const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'Following',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      }
    }, // columns are foreign keys only
    {
      tableName: 'Following',
      timestamps: false
    }
  );
};
