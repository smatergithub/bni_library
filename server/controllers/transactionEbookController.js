const Ebooks = require('../models/').ebooks;
const TransactionEbook = require('../models').transactionEbook;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = {
  list: async (req, res) => {
    console.log("test");

    TransactionEbook.findAll({})
      .then(res => {
        console.log("res", res);
      })
    // TransactionEbook.findAll()
    //   .then(result => {
    //     console.log("result", result);
    //     let activePage = Math.ceil(result.count / paramQuerySQL.limit);
    //     let page = paramQuerySQL.page;
    //     res.status(200).json({
    //       count: result.count,
    //       // totalPage: activePage,
    //       // activePage: page,
    //       data: result
    //     })

    //   })
    //   .catch(err => {
    //     res.status(500).send(err);
    //   })
  },

  // pinjam ebook
  borrowEbook: async (req, res) => {

    const { ebooks } = req.body;
    var userId = req.userId;
    // const checkTransaction = await TransactionEbook.findAll({
    //   where: { userId: userId },
    //   where: { status: "Borrowed" },
    // })

    // if (checkTransaction) {
    //   return res.status(404).json({ message: "already borrow ebook before" });
    // }

    ebooks.forEach(async (ebookData) => {
      console.log("ebook data", ebookData)
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
        status: 'Borrowed',
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

      return res.status(201).json({
        message: "Process Succesfully create Transaction Borrow Ebook",
        data: createTransaction
      });
    })

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
            status: 'Returned',
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
      message: 'Succesfully Return',
    });
  },
};
