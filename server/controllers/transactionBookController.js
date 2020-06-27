const Sequelize = require('sequelize');
const Books = require('../models/').books;
const TransactionBook = require('../models').transactionBook;

module.exports = {
  list: async (req, res) => {

    // queryStrings
    let { q, order, sort, limit, page, offset } = req.query;
    let paramQuerySQL = {
      include: ['book', 'user']
    };

    //search (q) , need fix
    if (q != '' && typeof q !== 'undefined') {
      paramQuerySQL.where = {
        q: {
          [Op.like]: '%' + q + '%',
        },
      };
    }
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
    books.forEach(async (bookData) => {
      let book = await Books.findByPk(bookData.bookId);

      if (!book) {
        return res.status(404).json({
          message: "Book not Found"
        })
      }
      // validate if quantity grather than book stock
      if (bookData.quantity > book.stockBook) {
        return res.json({
          message: 'exceeded the stock limit',
        });
      }

      await Books.findByPk(bookData.bookId)
        .then(book => {
          book
            .update({
              stockBook: book.stockBook - bookData.quantity,
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
        message: "Process Succesfully",
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
            stockBook: book.stockBook + transactionBook.quantity,
          })
          .catch(err => {
            res.status(404).send(err);
          });
      })
      .catch(err => {
        res.status(404).send(err);
      });

    return res.status(200).json({
      message: 'Succesfully Return',
    });
  },
};
