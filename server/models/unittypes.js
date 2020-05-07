'use strict';
module.exports = (sequelize, DataTypes) => {
  const unitTypes = sequelize.define(
    'unitTypes',
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
  unitTypes.associate = function(models) {
    // associations can be defined here
    unitTypes.hasOne(models.books, {
      foreignKey: 'unitTypeId',
    });
  };
  return unitTypes;
};
