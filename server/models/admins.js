'use strict';
module.exports = (sequelize, DataTypes) => {
  const admins = sequelize.define(
    'admins',
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
  admins.associate = function(models) {
    // associations can be defined here
    admins.hasMany(models.transactions, {
      foreignKey: 'adminId',
      as: 'admins',
    });
  };
  return admins;
};
