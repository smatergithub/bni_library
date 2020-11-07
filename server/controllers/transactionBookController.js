const Books = require('../models/').books;
const TransactionBook = require('../models').transactionBook;
const ListBorrowBook = require("../models").listBorrowBook
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require("moment");
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
          [Op.like]: '%' + code + '%'
        }
      }
    }
    if (status != '' && typeof status !== 'undefined') {
      paramQuerySQL.where = {
        status: {
          [Op.like]: '%' + status + '%'
        }
      }
    }

    if (startDate != '' && typeof startDate !== 'undefined') {
      paramQuerySQL.where = {
        startDate: {
          [Op.like]: '%' + startDate + '%'
        }
      }
    }

    if (endDate != '' && typeof endDate !== 'undefined') {
      paramQuerySQL.where = {
        endDate: {
          [Op.like]: '%' + endDate + '%'
        }
      }
    }

    if (userId != '' && typeof userId !== 'undefined') {
      paramQuerySQL.where = {
        userId: {
          [Op.like]: '%' + userId + '%'
        }
      }
    }

    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }

    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.body.limit);
    }


    // order by
    if (order != '' && typeof order !== 'undefined' && ['createdAt'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [
        [order, sort]
      ];
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
          data: result.rows
        })

      })
      .catch(err => {
        res.status(500).send(err);
      })
  },


  listHistory: async (req, res) => {
    let { code, status, startDate, endDate, userId, limit, page, order, sort } = req.body;
    let paramQuerySQL = {
      where: { status: "Dikembalikan" },
      include: ['book', 'user'],
    };

    if (code != '' && typeof code !== 'undefined') {
      paramQuerySQL.where = {
        code: {
          [Op.like]: '%' + code + '%'
        }
      }
    }
    if (status != '' && typeof status !== 'undefined') {
      paramQuerySQL.where = {
        status: {
          [Op.like]: '%' + status + '%'
        }
      }
    }

    if (startDate != '' && typeof startDate !== 'undefined') {
      paramQuerySQL.where = {
        startDate: {
          [Op.like]: '%' + startDate + '%'
        }
      }
    }

    if (endDate != '' && typeof endDate !== 'undefined') {
      paramQuerySQL.where = {
        endDate: {
          [Op.like]: '%' + endDate + '%'
        }
      }
    }

    if (userId != '' && typeof userId !== 'undefined') {
      paramQuerySQL.where = {
        userId: {
          [Op.like]: '%' + userId + '%'
        }
      }
    }

    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }

    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.body.limit);
    }


    // order by
    if (order != '' && typeof order !== 'undefined' && ['createdAt'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [
        [order, sort]
      ];
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
          data: result.rows
        })

      })
      .catch(err => {
        res.status(500).send(err);
      })
  },

   exportListHistoryBook : async (req,res) => {
    // return Users.findAll({
    //     order: [
    //       ['createdAt', 'DESC'],
    //     ],
    //   }).then(user => {
    //   let userDisplay = []
    //   user.forEach(item => {
    //     const userData = {
    //       ...item.dataValues
    //     }
    //     userDisplay.push(userData)
    //   })

    //   let headingColumnIndex = 1;
    //   userDisplay.forEach((obj) => {
    //   Object.keys(obj).forEach((key) => {
    //        ws.cell(1, headingColumnIndex++)
    //           .string(key)
    //   });
    // });
    //   //Write Data in Excel file
    //   let rowIndex = 2;
    //   userDisplay.forEach( record => {
    //       let columnIndex = 1;
    //       Object.keys(record ).forEach(columnName =>{
    //           ws.cell(rowIndex,columnIndex++)
    //               .string(record [columnName])
    //       });
    //       rowIndex++;
    //   });
    //   wb.write('ListUser.xlsx');
    //   res.status(200).send(user);
    // })
    // .catch(error => res.status(404).send(error));
  },


  // pinjam buku
  borrowBook: async (req, res) => {

    const { books } = req.body;
    var userId = req.userId;
    const checkTransaction = await TransactionBook.findAll({
      where: { userId: userId },
      where: { status: "Dipinjam" },
    })


    if (checkTransaction.length >= 2) {
      return res.status(404).json({ message: "Anda Sudah Meminjam 2 Buku Sebelumnya" });
    }

    books.forEach(async (bookData) => {
      let book = await Books.findByPk(bookData.bookId);

      if (!book) {
        return res.status(404).json({
          message: "Book not Found"
        })
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
              status: book.stockBuku < 0 ? "Ada" : "Kosong",

            })
            .catch(err => {
              return res.status(404).send(err);
            });
        })
        .catch(err => {
          return res.status(404).send(err);
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
        isGiveRating: false
      }

      let start = moment(requestPayload.startDate).format("YYYY-MM-DD")
      let end = moment(requestPayload.endDate).format("YYYY-MM-DD")
      let between = moment.duration(moment(end).diff(start)).asDays();

      if(between >= 14){
        return res.status(404).json({ message: "Peminjaman maksimal 14 Hari" });
      }

      const createTransaction = await TransactionBook.create(requestPayload);

      if (!createTransaction) {
        return res.status(404).send("Failed Transaction");
      }


      ListBorrowBook.findAll({
        where: {
          bookId: bookData.bookId
        }
      })
        .then(response => {
          response[0].update({
            bookId: response.bookId,
            transactionBookId: createTransaction.id,
            userId: createTransaction.userId
          })

        }).catch(err => { });

      return res.status(201).json({
        message: "Process Succesfully create Transaction Borrow Book",
        data: createTransaction
      });
    })

  },


  updateTransactionBook: async (req, res) => {
    const { transactionId } = req.params;

    TransactionBook.findByPk(transactionId)
      .then(transaction => {
        transaction
          .update({
            startDate: req.body.startDate,
            endDate: req.body.endDate
          })
          .catch(err => {
            res.status(404).send(err);
          });
      })
      .catch(err => {
        res.status(404).send(err);
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
            isGiveRating: false
          })
          .catch(err => {
            res.status(404).send(err);
          });
      })
      .catch(err => {
        res.status(404).send(err);
      });

    Books.findByPk(transactionBook.bookId)
      .then(book => {
        book
          .update({
            stockBuku: book.stockBuku + transactionBook.quantity,
          })
          .catch(err => {
            res.status(404).send(err);
          });
      })
      .catch(err => {
        res.status(404).send(err);
      });

    return res.status(200).json({
      message: 'Succesfully Return Book',
    });
  },
};
