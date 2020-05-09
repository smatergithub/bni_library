'use strict';
module.exports = (sequelize, DataTypes) => {
  const unittypes = sequelize.define(
    'unittypes',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      code: DataTypes.STRING,
      displayName: DataTypes.STRING,
    },
    {}
  );
  unittypes.associate = function(models) {
    // associations can be defined here
    unittypes.hasOne(models.books, {
      foreignKey: 'unitTypeId',
    });
  };
  return unittypes;
};
