'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {}
  );
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.transactions, {
      foreignKey: 'userId',
      as: 'users',
    });
  };
  return users;
};
