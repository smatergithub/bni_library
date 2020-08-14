const TransactionEbook = require("../models").transactionEbook;
const RatingEbook = require("../models").ratingEbook;

module.exports = {
  inputRatingEbook: async (req, res) => {
    var userId = req.userId;
    TransactionEbook.findAll({
      where: {
        userId: userId
      }
    })
      .then(transaction => {
        let dataTransactionReturned = transaction.filter(x => x.status === "Dikembalikan");
        let dataTransactionRating = dataTransactionReturned.filter(x => x.isGiveRating === false);
        if (!dataTransactionRating) {
          res.status(500).json({ message: "transaction ebook not found" })
        }
        const createRating = RatingEbook.create({
          transactionEbookId: dataTransactionRating[0].id,
          bookId: dataTransactionRating[0].bookId,
          userId: req.userId,
          rating: req.body.rating,
          note: req.body.note
        })

        if (!createRating) {
          return res.status(404).send("Failed rating");
        }

        if (createRating) {
          TransactionEbook.findByPk(dataTransactionRating[0].id).then(transaksi => {
            transaksi.update({
              isGiveRating: true
            }).then(response => {
              return res.status(201).json({
                message: "Process Succesfully input rating",
              });
            })
          })
        }
        else {
          return res.status(200).json({
            message: "no rating input ",
          });
        }
      })
      .catch(err => {
        res.status(200).send(err);
      })
  }
}
