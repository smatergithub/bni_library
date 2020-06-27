const Users = require('../models').users;
const TransactionBook = require("../models").transactionBook;

module.exports = {
  profileUser: async (req, res) => {
    var userId = req.userId;
    Users.findOne({
      where: {
        id: userId,
      },
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'Profile Not found.' });
        }
        let dataUser = {
          id: user.id,
          nama: user.nama,
          phoneNumber: user.phoneNumber,
          tanggalLahir: user.tanggalLahir,
          wilayah: user.wilayah,
          singkatan: user.singkatan,
          kdunit: user.kdunit,
          unitBesaran: user.unitBesaran,
          unit: user.unit,
          jenjang: user.jenjang,
          jabatan: user.jabatan,
          email: user.email,
          alamat: user.alamat,
          email: user.email,
          imageUrl: user.imageUrl,
          isAdmin: user.isAdmin,
          superAdmin: user.superAdmin,
        };
        res.status(200).send(dataUser);
      })
      .catch(error => res.status(400).send(error));
  },

  listBorrowBookUser: async (req, res) => {
    var userId = req.userId;
    Users.findOne({
      where: {
        id: userId
      },
    }).then(user => {
      TransactionBook.findOne({
        where: {
          userId: user.id
        },
        includes: ['books']
      })
        .then(transaction => {
          res.status(200).send(transaction)
        })
        .catch(err => {
          res.status(400).send(err)
        })
    })
      .catch(err => {
        res.status(400).send(err);
      })
  }

};
