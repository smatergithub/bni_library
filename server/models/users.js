'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  users.beforeCreate(users => (users.id = uuidv4()));
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.transactions, {
      foreignKey: 'userId',
    });
  };
  return users;
};
