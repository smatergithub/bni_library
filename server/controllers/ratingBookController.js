const TransactionBook = require("../models").transactionBook;
const RatingBook = require("../models").ratingBook;

module.exports = {
  inputRatingBook: async (req, res) => {
    var userId = req.userId;
    TransactionBook.findAll({
      where: {
        userId: userId
      }
    })
      .then(transaction => {
        let dataTransactionReturned = transaction.filter(x => x.status === "Dikembalikan");
        let dataTransactionRating = dataTransactionReturned.filter(x => x.isGiveRating === false);
        if (!dataTransactionRating) {
          res.status(500).json({ message: "transaction book not found" })
        }
        const createRating = RatingBook.create({
          transactionBookId: dataTransactionRating[0].id,
          bookId: dataTransactionRating[0].bookId,
          userId: req.userId,
          rating: req.body.rating,
          note: req.body.note
        })

        if (!createRating) {
          return res.status(404).send("Failed rating");
        }

        if (createRating) {
          TransactionBook.findByPk(dataTransactionRating[0].id).then(transaksi => {
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
