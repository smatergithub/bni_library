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
      editor: DataTypes.STRING,
      university: DataTypes.STRING,
      translateBy: DataTypes.STRING,
      description: DataTypes.STRING,
      releaseYear: DataTypes.STRING,
      city: DataTypes.STRING,
      bab1: DataTypes.STRING,
      bab2: DataTypes.STRING,
      bab3: DataTypes.STRING,
      bab4: DataTypes.STRING,
      bab5: DataTypes.STRING,
      abstrack: DataTypes.STRING,
    },
    {}
  );
  repository.associate = function(models) {
    // associations can be defined here
  };
  return repository;
};
