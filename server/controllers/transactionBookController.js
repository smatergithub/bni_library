const Sequelize = require('sequelize');
const Books = require('../models/').books;
const TransactionBook = require('../models').transactionBook;

module.exports = {
  list: async (req, res) => {

    // queryStrings
    let { order, sort, limit, page, offset } = req.query;
    let paramQuerySQL = {
      include: ['book', 'user']
    };
    //limit
    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }
    // page
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.page = parseInt(page);
    }
    // offset
    if (offset != '' && typeof offset !== 'undefined' && offset > 0) {
      paramQuerySQL.offset = parseInt(offset - 1);
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
        let totalPage = Math.ceil(book.count / req.body.limit);
        let page = Math.ceil(req.body.page);
        res.status(200).json({
          count: result.count,
          totalPage: totalPage,
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

      const createTransaction = await TransactionBook.create({
        code: `INV-${Math.round(Math.random() * 1000000)}`,
        transDate: Date(),
        status: 'Borrowed',
        userId: req.userId,
        note: req.body.note,
        quantity: bookData.quantity,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        bookId: bookData.bookId,
      });

      if (!createTransaction) {
        return res.status(404).send("Failed Transaction");
      }

      return res.status(203).json({
        message: "Process Succesfully create Transaction Borrow Book",
        data: createTransaction
      });
    })

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
            status: 'Returned',
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
