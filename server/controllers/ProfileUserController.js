const Users = require('../models').users;
const TransactionBook = require('../models').transactionBook;
const TransactionEbook = require('../models').transactionEbook;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
  profileUser: async (req, res) => {
    var userId = req.userId;
    Users.findOne({
      where: {
        id: userId,
      },
      includes: ['book'],
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
          alamat: user.alamat,
          email: user.email,
          imageUrl: user.imageUrl,
          mapUrl: user.mapUrl,
          isAdmin: user.isAdmin,
          superAdmin: user.superAdmin,
        };
        res.status(200).send(dataUser);
      })
      .catch(error => res.status(500).send(error));
  },

  updateProfile: async (req, res) => {
    var userId = req.userId;
    console.log('==================');
    console.log(req.body.mapUrl);
    Users.findOne({
      where: {
        id: userId,
      },
    })
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'User Not Found ' });
        }
        let dataUser = {
          id: userId ? userId : req.body.id,
          nama: req.body.nama,
          phoneNumber: req.body.phoneNumber,
          tanggalLahir: req.body.tanggalLahir,
          wilayah: req.body.wilayah,
          singkatan: req.body.singkatan,
          kdunit: req.body.kdunit,
          unitBesaran: req.body.unitBesaran,
          unit: req.body.unit,
          jenjang: req.body.jenjang,
          jabatan: req.body.jabatan,
          email: req.body.email,
          alamat: req.body.alamat,
          imageUrl: req.body.imageUrl,
          mapUrl: req.body.mapUrl,
          isAdmin: req.body.isAdmin,
          superAdmin: req.body.superAdmin,
        };
        user
          .update(dataUser)
          .then(response => {
            res.status(200).json({ message: 'Succesfully Update' });
          })
          .catch(err => {
            console.log(err);
            res.status(404).json({ message: 'failed Update' });
          });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  listBorrowBookUser: async (req, res) => {
    var userId = req.params.id;
    let { q, order, sort, page, limit, rating, borrowed } = req.query;
    let paramQuerySQL = {};
    if (borrowed != '' && borrowed == 'true') {
      paramQuerySQL.where = {
        [Op.and]: {
          userId: {
            [Op.like]: '%' + userId + '%',
          },
          status: {
            [Op.like]: '%' + 'Dipinjam' + '%',
          },
        },
      };
    } else if (rating != '' && rating == 'true') {
      paramQuerySQL.where = {
        [Op.and]: {
          userId: {
            [Op.like]: '%' + userId + '%',
          },
          isGiveRating: false,
        },
      };
    } else {
      paramQuerySQL.where = {
        [Op.and]: {
          userId: {
            [Op.like]: '%' + userId + '%',
          },
        },
      };
    }
    paramQuerySQL.include = ['book'];

    //limit
    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }
    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.query.limit);
    }

    // sort par defaut si param vide ou inexistant
    if (typeof sort === 'undefined' || sort == '') {
      sort = 'ASC';
    }
    // order by
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }

    TransactionBook.findAndCountAll(paramQuerySQL)
      .then(result => {
        let activePage = Math.ceil(result.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: result.count,
          totalPage: activePage,
          activePage: page,
          data: result.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  listHistoryBorrowBookUser: async (req, res) => {
    var userId = req.userId;
    let { q, order, sort, limit, page } = req.query;
    let paramQuerySQL = {
      where: { userId: userId },
      where: { status: 'Dikembalikan' },
      include: ['book', 'user'],
    };

    //limit
    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }
    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.query.limit);
    }

    // sort par defaut si param vide ou inexistant
    if (typeof sort === 'undefined' || sort == '') {
      sort = 'ASC';
    }
    // order by
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }

    TransactionBook.findAndCountAll(paramQuerySQL)
      .then(result => {
        let activePage = Math.ceil(result.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: result.count,
          totalPage: activePage,
          activePage: page,
          data: result.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  listBorrowEbookUser: async (req, res) => {
    var userId = req.params.id;
    let { q, order, sort, limit, page, rating, borrowed } = req.query;
    let paramQuerySQL = {};
    if (borrowed != '' && borrowed == 'true') {
      paramQuerySQL.where = {
        [Op.and]: {
          userId: {
            [Op.like]: '%' + userId + '%',
          },
          status: {
            [Op.like]: '%' + 'Dipinjam' + '%',
          },
        },
      };
    } else if (rating != '' && rating == 'true') {
      paramQuerySQL.where = {
        [Op.and]: {
          userId: {
            [Op.like]: '%' + userId + '%',
          },
          isGiveRating: false,
        },
      };
    } else {
      paramQuerySQL.where = {
        [Op.and]: {
          userId: {
            [Op.like]: '%' + userId + '%',
          },
        },
      };
    }
    paramQuerySQL.include = ['ebook'];

    //limit
    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }
    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.query.limit);
    }

    // sort par defaut si param vide ou inexistant
    if (typeof sort === 'undefined' || sort == '') {
      sort = 'ASC';
    }
    // order by
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }

    TransactionEbook.findAndCountAll(paramQuerySQL)
      .then(result => {
        let activePage = Math.ceil(result.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: result.count,
          totalPage: activePage,
          activePage: page,
          data: result.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  listHistoryBorrowEbookUser: async (req, res) => {
    var userId = req.userId;
    let { q, order, sort, limit, page } = req.query;
    let paramQuerySQL = {
      where: { userId: userId },
      where: { isBorrowed: true },
      where: { status: 'Dikembalikan' },
      include: ['ebook', 'user'],
    };

    //limit
    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }
    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.query.limit);
    }

    // sort par defaut si param vide ou inexistant
    if (typeof sort === 'undefined' || sort == '') {
      sort = 'ASC';
    }
    // order by
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }

    TransactionEbook.findAndCountAll(paramQuerySQL)
      .then(result => {
        let activePage = Math.ceil(result.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: result.count,
          totalPage: activePage,
          activePage: page,
          data: result.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
};
