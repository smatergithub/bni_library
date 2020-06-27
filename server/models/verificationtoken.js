'use strict';
module.exports = (sequelize, DataTypes) => {
  const verificationToken = sequelize.define(
    'verificationToken',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {}
  );
  verificationToken.associate = function (models) {
    verificationToken.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return verificationToken;
};
