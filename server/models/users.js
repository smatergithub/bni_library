'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      npp: DataTypes.STRING,
      nama: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      tanggalLahir: DataTypes.DATE,
      wilayah: DataTypes.STRING,
      singkatan: DataTypes.STRING,
      kdunit: DataTypes.STRING,
      unitBesaran: DataTypes.STRING,
      unit: DataTypes.STRING,
      jenjang: DataTypes.STRING,
      jabatan: DataTypes.STRING,
      alamat: DataTypes.STRING,
      email: DataTypes.STRING,
      mapUrl: DataTypes.STRING(1000),
      imageUrl: DataTypes.STRING,
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      isAdmin: DataTypes.BOOLEAN,
      superAdmin: DataTypes.BOOLEAN,
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.transactionBook, {
      foreignKey: 'userId',
      as: 'users',
    });
  };
  return users;
};
