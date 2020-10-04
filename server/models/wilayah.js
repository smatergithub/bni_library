'use strict';
module.exports = (sequelize, DataTypes) => {
  const wilayah = sequelize.define('wilayah', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    codeWilayah: DataTypes.STRING,
    wilayah: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    linkGoogleMap: DataTypes.TEXT,
  }, {});
  wilayah.associate = function (models) {
    // associations can be defined here
  };
  return wilayah;
};
