'use strict';
module.exports = (sequelize, DataTypes) => {
  const unitTypes = sequelize.define(
    'unitTypes',
    {
      code: DataTypes.STRING,
      displayName: DataTypes.STRING,
    },
    {}
  );
  unitTypes.associate = function(models) {
    // associations can be defined here
    unitTypes.hasOne(models.books, {
      foreignKey: 'unitTypeId',
      as: 'unitType',
    });
  };
  return unitTypes;
};
