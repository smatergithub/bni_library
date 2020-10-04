'use strict';
module.exports = (sequelize, DataTypes) => {
  const uploadFile = sequelize.define('uploadFile', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    locationFile: DataTypes.STRING
  }, {});
  uploadFile.associate = function (models) {
    // associations can be defined here
  };
  return uploadFile;
};
