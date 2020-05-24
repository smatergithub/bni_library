'use strict';
module.exports = (sequelize, DataTypes) => {
  const repository = sequelize.define('repository', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    university: DataTypes.STRING,
    titleRepository: DataTypes.STRING,
    bab1: DataTypes.STRING,
    bab2: DataTypes.STRING,
    bab3: DataTypes.STRING,
    bab4: DataTypes.STRING,
    bab5: DataTypes.STRING,
    abstrack: DataTypes.STRING
  }, {});
  repository.associate = function (models) {
    // associations can be defined here
  };
  return repository;
};
