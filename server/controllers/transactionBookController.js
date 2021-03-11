const Books = require('../models/').books;
const TransactionBook = require('../models').transactionBook;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');

module.exports = {
  list: async (req, res) => {
    let { code, status, startDate, endDate, userId, limit, page, order, sort } = req.body;
    let paramQuerySQL = {
      where: { status: 'Dipinjam' },
      include: ['book', 'user'],
    };

    if (code != '' && typeof code !== 'undefined') {
      paramQuerySQL.where = {
        code: {
          [Op.like]: '%' + code + '%',
        },
      };
    }
    if (status != '' && typeof status !== 'undefined') {
      paramQuerySQL.where = {
        status: {
          [Op.like]: '%' + status + '%',
        },
      };
    }

    if (startDate != '' && typeof startDate !== 'undefined') {
      paramQuerySQL.where = {
        startDate: {
          [Op.like]: '%' + startDate + '%',
        },
      };
    }

    if (endDate != '' && typeof endDate !== 'undefined') {
      paramQuerySQL.where = {
        endDate: {
          [Op.like]: '%' + endDate + '%',
        },
      };
    }

    if (userId != '' && typeof userId !== 'undefined') {
      paramQuerySQL.where = {
        userId: {
          [Op.like]: '%' + userId + '%',
        },
      };
    }

    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }

    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.body.limit);
    }

    // order by
    if (
      order != '' &&
      typeof order !== 'undefined' &&
      ['createdAt'].includes(order.toLowerCase())
    ) {
      paramQuerySQL.order = [[order, sort]];
    }

    if (typeof sort !== 'undefined' && !['asc', 'desc'].includes(sort.toLowerCase())) {
      sort = 'DESC';
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

  listHistory: async (req, res) => {
    let { code, status, startDate, endDate, userId, limit, page, order, sort } = req.body;
    let paramQuerySQL = {
      where: { status: 'Dikembalikan' },
      include: ['book', 'user'],
    };

    if (code != '' && typeof code !== 'undefined') {
      paramQuerySQL.where = {
        code: {
          [Op.like]: '%' + code + '%',
        },
      };
    }
    if (status != '' && typeof status !== 'undefined') {
      paramQuerySQL.where = {
        status: {
          [Op.like]: '%' + status + '%',
        },
      };
    }

    if (startDate != '' && typeof startDate !== 'undefined') {
      paramQuerySQL.where = {
        startDate: {
          [Op.like]: '%' + startDate + '%',
        },
      };
    }

    if (endDate != '' && typeof endDate !== 'undefined') {
      paramQuerySQL.where = {
        endDate: {
          [Op.like]: '%' + endDate + '%',
        },
      };
    }

    if (userId != '' && typeof userId !== 'undefined') {
      paramQuerySQL.where = {
        userId: {
          [Op.like]: '%' + userId + '%',
        },
      };
    }

    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }

    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.body.limit);
    }

    // order by
    if (
      order != '' &&
      typeof order !== 'undefined' &&
      ['createdAt'].includes(order.toLowerCase())
    ) {
      paramQuerySQL.order = [[order, sort]];
    }

    if (typeof sort !== 'undefined' && !['asc', 'desc'].includes(sort.toLowerCase())) {
      sort = 'DESC';
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

  // pinjam buku
  borrowBook: async (req, res) => {
    const { books } = req.body;
    var userId = req.userId;
    const checkTransaction = await TransactionBook.findAll({
      where: { userId: userId },
      where: { status: 'Dipinjam' },
    });

    if (checkTransaction.length >= 2) {
      return res.status(400).json({ message: 'Anda Sudah Meminjam 2 Buku Sebelumnya' });
    }

    books.forEach(async bookData => {
      let book = await Books.findByPk(bookData.bookId);

      if (!book) {
        return res.status(400).json({
          message: 'Book not Found',
        });
      }
      // validate if quantity grather than book stock
      if (bookData.quantity > book.stockBuku) {
        return res.json({
          message: 'exceeded the stock limit',
        });
      }

      await Books.findByPk(bookData.bookId)
        .then(book => {
          book
            .update({
              stockBuku: book.stockBuku - bookData.quantity,
              status: book.stockBuku < 0 ? 'Ada' : 'Kosong',
              jumlahDipinjam: book.quantity + bookData.quantity,
            })
            .catch(err => {
              return res.status(400).send(err);
            });
        })
        .catch(err => {
          return res.status(500).send(err);
        });

      let requestPayload = {
        code: `INV-${Math.round(Math.random() * 1000000)}`,
        transDate: Date(),
        status: 'Dipinjam',
        userId: req.userId,
        note: req.body.note,
        quantity: bookData.quantity,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        bookId: bookData.bookId,
        isGiveRating: false,
      };

      let start = moment(requestPayload.startDate).format('YYYY-MM-DD');
      let end = moment(requestPayload.endDate).format('YYYY-MM-DD');
      let between = moment.duration(moment(end).diff(start)).asDays();

      if (between >= 14) {
        return res.status(400).json({ message: 'Peminjaman maksimal 14 Hari' });
      }

      const createTransaction = await TransactionBook.create(requestPayload);

      if (!createTransaction) {
        return res.status(400).send('Failed Transaction');
      }

      return res.status(201).json({
        message: 'Process Succesfully create Transaction Borrow Book',
        data: createTransaction,
      });
    });
  },

  updateTransactionBook: async (req, res) => {
    const { transactionId } = req.params;

    TransactionBook.findByPk(transactionId)
      .then(transaction => {
        transaction
          .update({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(500).send(err);
      });
    return res.status(200).json({
      message: 'Succesfully Update Book',
    });
  },

  returnABook: async (req, res) => {
    const { transactionId } = req.params;

    const transactionBook = await TransactionBook.findByPk(transactionId);

    if (!transactionBook) {
      return res.json({
        message: 'transaction not found',
      });
    }

    TransactionBook.findByPk(transactionId)
      .then(transaction => {
        transaction
          .update({
            status: 'Dikembalikan',
            isGiveRating: false,
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(500).send(err);
      });

    Books.findByPk(transactionBook.bookId)
      .then(book => {
        book
          .update({
            stockBuku: book.stockBuku + transactionBook.quantity,
            jumlahDipinjam: book.quantity - transactionBook.quantity,
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(500).send(err);
      });

    return res.status(200).json({
      message: 'Succesfully Return Book',
    });
  },

  exportListHistoryBook: async (req, res) => {
    try {
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;

      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'tidak ditemukan tanggal awal dan tanggal akhir' });
      }

      const transactions = await TransactionBook.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          status: 'Dikembalikan',
          [Op.or]: {
            startDate: {
              [Op.between]: [startDate, endDate],
            },
            endDate: {
              [Op.between]: [startDate, endDate],
            },
          },
        },
        include: ['book', 'user'],
      });

      if (transactions.length < 1) {
        return res.status(404).json({
          message: 'data transaksi tidak ditemukan',
        });
      }

      // const wb = new xl.Workbook();
      // const ws = wb.addWorksheet('Sheet 1');

      let transactionDisplay = [];
      transactions.forEach(item => {
        const transactionData = {
          ...item.dataValues,
        };
        transactionDisplay.push(transactionData);
      });

      // header
      let headingColumnIndex = 1;
      Object.keys(transactionDisplay[0]).forEach(key => {
        if (key != 'isAdmin' && key != 'superAdmin' && key != 'isRepoAdmin') {
          ws.cell(1, headingColumnIndex++).string(key);
        }
      });

      //Write Data in Excel file
      let rowIndex = 2;
      transactionDisplay.forEach(record => {
        let columnIndex = 1;
        Object.keys(record).forEach(columnName => {
          if (columnName != 'user' && columnName != 'book') {
            ws.cell(rowIndex, columnIndex++).string(
              record[columnName] == null ? '' : record[columnName].toString()
            );
          }
        });
        rowIndex++;
      });

      wb.write(`Report Transaction Book - ${new Date().getTime() / 1000}.xlsx`, res);
      // res.writeHead(200, [['Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']]);
      // wb.writeToBuffer('Excel.xlsx').then((buffer) => {
      //   res.end(new Buffer(buffer, 'base64'));
      // });
    } catch (error) {
      console.log(error);
    }

    // return TransactionBook.findAll({
    //   order: [['createdAt', 'DESC']],
    //   where: { status: 'Dikembalikan' },
    //   include: ['book', 'user'],
    // })
    //   .then(user => {
    //     let userDisplay = [];
    //     user.forEach(item => {
    //       const userData = {
    //         code: item.dataValues.code,
    //         transDate: item.dataValues.transDate,
    //         status: item.dataValues.status,
    //         note: item.dataValues.note,
    //         quantity: item.dataValues.quantity,
    //         startDate: item.dataValues.startDate,
    //         kategori: item.dataValues.book && item.dataValues.book.dataValues.kategori,
    //         judul: item.dataValues.book && item.dataValues.book.dataValues.judul,
    //         stockBuku: item.dataValues.book && item.dataValues.book.dataValues.stockBuku,
    //         countRating: item.dataValues.book && item.dataValues.book.dataValues.countRating,
    //         npp: item.dataValues.user && item.dataValues.user.dataValues.npp,
    //         nama: item.dataValues.user && item.dataValues.user.dataValues.nama,
    //         phoneNumber: item.dataValues.user && item.dataValues.user.dataValues.phoneNumber,
    //         tanggalLahir: item.dataValues.user && item.dataValues.user.dataValues.tanggalLahir,
    //         wilayah: item.dataValues.user && item.dataValues.user.dataValues.wilayah,
    //         singkatan: item.dataValues.user && item.dataValues.user.dataValues.singkatan,
    //         jabatan: item.dataValues.user && item.dataValues.user.dataValues.jabatan,
    //         alamat: item.dataValues.user && item.dataValues.user.dataValues.alamat,
    //         email: item.dataValues.user && item.dataValues.user.dataValues.email,
    //       };
    //       userDisplay.push(userData);
    //     });

    //     // header
    //     let headingColumnIndex = 1;
    //     Object.keys(userDisplay[0]).forEach(key => {
    //       ws.cell(1, headingColumnIndex++).string(key);
    //     });

    //     //Write Data in Excel file
    //     let rowIndex = 2;
    //     userDisplay.forEach(record => {
    //       let columnIndex = 1;
    //       Object.keys(record).forEach(columnName => {
    //         ws.cell(rowIndex, columnIndex++).string(
    //           record[columnName] == null ? '' : record[columnName].toString()
    //         );
    //       });
    //       rowIndex++;
    //     });

    //     wb.write('list_history_book.xlsx', res);
    //   })
    //   .catch(err => {
    //     res.status(500).json({ message: err });
    //   });
  },
};
