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
  verificationToken.associate = function(models) {
    // associations can be defined here
    // verificationToken.belongsTo(models.users, {
    //   as: 'user',
    //   foreignKey: 'userId',
    //   foreignKeyConstraint: true,
    // });
    verificationToken.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
      foreignKeyConstraint: true,
    });
  };
  return verificationToken;
};
