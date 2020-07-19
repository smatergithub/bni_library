const Ebooks = require('../models/').ebooks;
const TransactionEbook = require('../models').transactionEbook;

module.exports = {
  list: async (req, res) => {
    let { code, status, startDate, endDate, userId, limit, offset, page, order, sort } = req.body;
    let paramQuerySQL = {
      include: ['ebook', 'user']
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

    // page
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.page = parseInt(page);
    }
    // offset
    if (offset != '' && typeof offset !== 'undefined' && offset > 0) {
      paramQuerySQL.offset = parseInt(offset - 1);
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

  // pinjam ebook
  borrowEbook: async (req, res) => {
    const { ebooks } = req.body;

    ebooks.forEach(async (ebookData) => {
      let ebook = await Ebooks.findByPk(ebookData.ebookId);
      if (!ebook) {
        return res.status(404).json({
          message: "Ebook not Found"
        })
      }

      if (ebook.isBorrowed) {
        return res.status(404).json({
          message: 'Ebook Already Borrowed',
        });
      }
    })

    await Ebooks.findByPk(ebookId)
      .then(ebook => {
        ebook
          .update({
            isBorrowed: true,
          })
          .catch(err => {
            return res.status(404).send(err);
          });
      })
      .catch(err => {
        return res.status(404).send(err);
      });

    const createTransaction = await transactionEbook
      .create({
        code: `INV-${Math.round(Math.random() * 1000000)}`,
        transDate: Date(),
        status: 'Borrowed',
        userId: req.userId,
        note: req.body.note,
        isBorrowed: true,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        ebookId: ebookData.ebookId,
      })

    if (!createTransaction) {
      return res.status(404).send("Failed Transaction");
    }

    return res.status(200).json({
      message: "Process Succesfully",
      data: createTransaction
    });

  },

  returnEbook: async (req, res) => {
    const { transactionId } = req.params;

    const transactionEbook = await TransactionEbook.findByPk(transactionId);

    if (!transactionBook) {
      return res.json({
        message: 'transaction not found',
      });
    }

    TransactionEbook.findByPk(transactionId)
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

    Ebooks.findByPk(transactionEbook.ebookId)
      .then(ebook => {
        ebook
          .update({
            isBorrowed: false,
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
