'use strict';
module.exports = (sequelize, DataTypes) => {
  const admins = sequelize.define(
    'admins',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
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
