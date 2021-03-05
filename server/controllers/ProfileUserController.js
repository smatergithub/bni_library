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
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'Profile Not found.' });
        }
        let dataUser = {
          id: user.id,
          npp: user.npp,
          nama: user.nama,
          tgl_lahir: user.tgl_lahir,
          wilayah: user.wilayah,
          singkatan: user.singkatan,
          kdunit: user.kdunit,
          unit_besaran: user.unit_besaran,
          unit: user.unit,
          jenjang: user.jenjang,
          jabatan: user.jabatan,
          alamat: user.alamat,
          email: user.email,
          url_img: user.url_img,
          mapUrl: user.mapUrl,
          isAdmin: user.isAdmin,
          superAdmin: user.superAdmin,
        };
        res.status(200).send(dataUser);
      })
      .catch((error) => res.status(500).send(error));
  },

  updateProfile: async (req, res) => {
    var userId = req.userId;
    Users.findOne({
      where: {
        id: userId,
      },
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User Not Found ' });
        }
        let dataUser = {
          id: userId ? userId : req.body.id,
          npp: req.body.npp,
          nama: req.body.nama,
          tgl_lahir: req.body.tanggalLahir,
          wilayah: req.body.wilayah,
          singkatan: req.body.singkatan,
          kdunit: req.body.kdunit,
          unit_besaran: req.body.unitBesaran,
          unit: req.body.unit,
          jenjang: req.body.jenjang,
          jabatan: req.body.jabatan,
          email: req.body.email,
          alamat: req.body.alamat,
          url_img: req.body.imageUrl,
          mapUrl: req.body.mapUrl,
          isAdmin: req.body.isAdmin,
          superAdmin: req.body.superAdmin,
        };
        user
          .update(dataUser)
          .then((response) => {
            res.status(200).json({ message: 'Succesfully Update' });
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({ message: 'failed Update' });
          });
      })
      .catch((err) => {
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
      .then((result) => {
        let activePage = Math.ceil(result.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: result.count,
          totalPage: activePage,
          activePage: page,
          data: result.rows,
        });
      })
      .catch((err) => {
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
      .then((result) => {
        let activePage = Math.ceil(result.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: result.count,
          totalPage: activePage,
          activePage: page,
          data: result.rows,
        });
      })
      .catch((err) => {
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
      .then((result) => {
        let activePage = Math.ceil(result.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: result.count,
          totalPage: activePage,
          activePage: page,
          data: result.rows,
        });
      })
      .catch((err) => {
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
      .then((result) => {
        let activePage = Math.ceil(result.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: result.count,
          totalPage: activePage,
          activePage: page,
          data: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  approveBorrowBookAndEbook: async (req, res) => {
    var userId = req.userId;
    let paramQuerySQL = {
      where: { userId: userId },
      where: { status: 'Dipinjam' },
    };
    let approvedBorrowBook = TransactionBook.findAndCountAll(paramQuerySQL).then((response) => {
      res.status(200).json({
        status: true,
        message: 'Ada Buku Yang Sukses Di approve Oleh Admin',
      });
    });

    let approvedBorrowEBook = TransactionEbook.findAndCountAll(paramQuerySQL).then((response) => {
      res.status(200).json({
        status: true,
        message: 'Ada Ebook Yang Sukes Di approve Oleh Admin',
      });
    });

    if (!approvedBorrowBook && !approvedBorrowEBook) {
      res.status(200).json({
        status: false,
        message: 'tidak ada buku dan ebook yang di approve oleh admin',
      });
    }
  },
};
