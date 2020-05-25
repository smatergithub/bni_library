'use strict';
module.exports = (sequelize, DataTypes) => {
  const ebooks = sequelize.define('ebooks', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    statementResponsibility: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    author: DataTypes.STRING,
    dateEbook: DataTypes.DATE,
    category: DataTypes.STRING,
    sourceEbook: DataTypes.STRING
  }, {});
  ebooks.associate = function (models) {
    // associations can be defined here
  };
  return ebooks;
};
