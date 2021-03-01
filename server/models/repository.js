'use strict';
module.exports = (sequelize, DataTypes) => {
  const repository = sequelize.define(
    'repository',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      category: DataTypes.STRING,
      methodology: DataTypes.STRING,
      university: DataTypes.STRING,
      faculty: DataTypes.STRING,
      description: DataTypes.STRING,
      releaseYear: DataTypes.STRING,
      strata: DataTypes.STRING,
      city: DataTypes.STRING,
      abstrack: DataTypes.STRING,
      document: DataTypes.STRING,
      isApproved: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  repository.associate = function(models) {
    // associations can be defined here
  };
  return repository;
};
