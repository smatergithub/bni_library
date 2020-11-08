const Ebooks = require('../models/').ebooks;
const TransactionEbook = require('../models').transactionEbook;
const ListBorrowEbook = require("../models").listBorrowEbook;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = {
  list: async (req, res) => {
    let { code, status, startDate, endDate, userId, limit, page, order, sort } = req.body;
    let paramQuerySQL = {
      where: { status: "Dipinjam" },
      include: ['ebook', 'user'],
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
    TransactionEbook.findAndCountAll(paramQuerySQL)
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
      include: ['ebook', 'user'],
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
    TransactionEbook.findAndCountAll(paramQuerySQL)
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

   exportListHistoryEbook : async (req,res) => {
    return TransactionEbook.findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
        where: { status: "Dikembalikan" },
         include: ['ebook', 'user'],
      }).then(response => {
      let historyData = []
      response.forEach(item => {
        const history = {
          code: item.dataValues.code,
          transDate: item.dataValues.transDate,
          status: item.dataValues.status,
          isGiveRating: item.dataValues.isGiveRating,
          note: item.dataValues.note,
          startDate: item.dataValues.startDate,
          kategori: item.dataValues.ebook.dataValues.kategori,
          judul: item.dataValues.ebook.dataValues.kategori,
          stockBuku: item.dataValues.ebook.dataValues.stockBuku,
          countRating: item.dataValues.ebook.dataValues.stockBuku,
          npp: item.dataValues.user.dataValues.npp,
          nama: item.dataValues.user.dataValues.nama,
          phoneNumber: item.dataValues.user.dataValues.phoneNumber,
          tanggalLahir: item.dataValues.user.dataValues.tanggalLahir,
          wilayah: item.dataValues.user.dataValues.wilayah,
          singkatan: item.dataValues.user.dataValues.singkatan,
          jabatan: item.dataValues.user.dataValues.jabatan,
          alamat: item.dataValues.user.dataValues.alamat,
          email: item.dataValues.user.dataValues.email,
        }
        historyData.push(history)
      })



      let headingColumnIndex = 1;
      historyData.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
           ws.cell(1, headingColumnIndex++)
              .string(key)
      });
    });
      //Write Data in Excel file
      let rowIndex = 2;
      historyData.forEach( record => {
          let columnIndex = 1;
          Object.keys(record ).forEach(columnName =>{
              ws.cell(rowIndex,columnIndex++)
                  .string(record [columnName])
          });
          rowIndex++;
      });
       wb.write('list_history_TransactionEbook.xlsx', res)
    })
    .catch(error => res.status(404).send(error));
  },

  // pinjam ebook
  borrowEbook: async (req, res) => {

    const { ebooks } = req.body;
    var userId = req.userId;


    ebooks.forEach(async (ebookData) => {
      let ebook = await Ebooks.findByPk(ebookData.ebookId);

      if (!ebook) {
        return res.status(404).json({
          message: "Ebook not Found"
        })
      }
      // validate if quantity grather than book stock
      // if (ebook.isBorrowed) {
      //   return res.json({
      //     message: 'Ebook Already Borrowed',
      //   });
      // }

      await Ebooks.findByPk(ebookData.ebookId)
        .then(book => {
          book
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


      const createTransaction = await TransactionEbook.create({
        code: `INV-${Math.round(Math.random() * 1000000)}`,
        transDate: Date(),
        status: 'Dipinjam',
        userId: req.userId,
        note: req.body.note,
        isBorrowed: true,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        ebookId: ebookData.ebookId,
        isGiveRating: false
      });


      if (!createTransaction) {
        return res.status(404).send("Failed Transaction");
      }
      ListBorrowEbook.findAll({
        where: {
          ebookId: ebookData.ebookId
        }
      })
        .then(response => {
          response[0].update({
            ebookId: response.ebookId,
            transactionEbookId: createTransaction.id,
            userId: createTransaction.userId
          })

        }).catch(err => { });

      return res.status(201).json({
        message: "Process Succesfully create Transaction Borrow Ebook",
        data: createTransaction
      });
    })

  },


  updateTransactionEbook: async (req, res) => {
    const { transactionId } = req.params;

    TransactionEbook.findByPk(transactionId)
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
      message: 'Succesfully Update Ebook',
    });
  },

  returnEbook: async (req, res) => {
    const { transactionId } = req.params;

    const transactionEbook = await TransactionEbook.findByPk(transactionId);

    if (!TransactionEbook) {
      return res.json({
        message: 'transaction not found',
      });
    }

    TransactionEbook.findByPk(transactionId)
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
      message: 'Succesfully Return Ebook',
    });
  },
};
