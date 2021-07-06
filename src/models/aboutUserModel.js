const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'About',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.DATE
      },
      address: {
        type: DataTypes.STRING
      },
      maritalStatus: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      mobile: {
        type: DataTypes.STRING
      },
      twitter: {
        type: DataTypes.STRING
      },
      skype: {
        type: DataTypes.STRING
      },
      occupation: {
        type: DataTypes.STRING
      },
      skills: {
        type: DataTypes.STRING
      },
      jobs: {
        type: DataTypes.STRING
      },
      profilePicture: {
        type: DataTypes.STRING,
        isUrl: true
      }
    },
    {
      tableName: 'About',
      timestamps: true
    }
  );
};
