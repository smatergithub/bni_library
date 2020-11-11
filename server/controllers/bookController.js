const Books = require('../models').books;
const ListBorrowBook = require('../models').listBorrowBook;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
require('dotenv').config();

const readXlsxFile = require('read-excel-file/node');

module.exports = {
  getBookList: async (req, res) => {
    let { judul, kategori, tahunTerbit, limit, page, order, sort } = req.body;
    let paramQuerySQL = {};

    if (kategori != '' && typeof kategori !== 'undefined') {
      paramQuerySQL.where = {
        [Op.and]: {
          kategori: {
            [Op.like]: '%' + kategori + '%',
          },
          judul: {
            [Op.like]: '%' + judul + '%',
          },
        },
      };
    }

    if (tahunTerbit != '' && typeof tahunTerbit !== 'undefined') {
      paramQuerySQL.where = {
        tahunTerbit: {
          [Op.like]: '%' + tahunTerbit + '%',
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

    return await Books.findAndCountAll(paramQuerySQL)
      .then(book => {
        let activePage = Math.ceil(book.count / req.body.limit);
        let page = req.body.page;
        res.status(200).json({
          count: book.count,
          totalPage: activePage,
          activePage: page,
          data: book.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getBookById: async (req, res) => {
    let paramQuerySQL = {
      include: ['book', 'transactionBook', 'user'],
      where: {
        bookId: req.params.id,
      },
    };
    return await ListBorrowBook.findAll(paramQuerySQL)
      .then(book => {
        if (!book) {
          return res.status(404).send({
            message: 'book Not Found',
          });
        }
        return res.status(200).send(book[0]);
      })
      .catch(error => res.status(500).send(error));
  },

  list: async (req, res) => {
    // let { judul, kategori, tahunTerbit, limit, page, order, sort } = req.body;
    let { limit, page } = req.body;
    let paramQuerySQL = {
      include: ['book', 'transactionBook', 'user'],
    };

    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }

    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.body.limit);
      //paramQuerySQL.offset = parseInt(page);
    }

    // order by
    // if (
    //   order != '' &&
    //   typeof order !== 'undefined' &&
    //   ['createdAt'].includes(order.toLowerCase())
    // ) {
    //   paramQuerySQL.order = [[order, sort]];
    // }
    // if (typeof sort !== 'undefined' && !['asc', 'desc'].includes(sort.toLowerCase())) {
    //   sort = 'DESC';
    // }

    // return await Books.findAndCountAll(paramQuerySQL)
    //   .then(book => {
    //     let totalPage = Math.ceil(book.count / req.body.limit);
    //     let page = Math.ceil(req.body.page);
    //     res.status(200).json({
    //       count: book.count,
    //       totalPage: totalPage,
    //       activePage: page,
    //       data: book.rows,
    //     });
    //   })
    //   .catch(err => {
    //     res.status(500).send(err);
    //   });
    return await ListBorrowBook.findAndCountAll(paramQuerySQL)
      .then(book => {
        let totalPage = Math.ceil(book.count / req.body.limit);
        let page = Math.ceil(req.body.page);

        res.status(200).json({
          count: book.count,
          totalPage: totalPage,
          activePage: page,
          data: book.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getById: async (req, res) => {
    let paramQuerySQL = {
      include: ['book', 'transactionBook', 'user'],
      where: {
        bookId: req.params.id,
      },
    };
    return await ListBorrowBook.findAll(paramQuerySQL)
      .then(book => {
        if (!book) {
          return res.status(404).send({
            message: 'book Not Found',
          });
        }
        return res.status(200).send(book[0]);
      })
      .catch(error => res.status(500).send(error));
  },

  add: async (req, res) => {
    let location = `${process.env.SERVER_BACKEND}/img/images/${req.file.filename}`;

    Books.create({
      kategori: req.body.kategori,
      judul: req.body.judul,
      pengarang: req.body.pengarang,
      tahunTerbit: req.body.tahunTerbit,
      description: req.body.description,
      stockBuku: req.body.stockBuku,
      tanggalTerbit: req.body.tanggalTerbit,
      isbn: req.body.isbn,
      bahasa: req.body.bahasa,
      penerbit: req.body.penerbit,
      lokasiPerpustakaan: req.body.lokasiPerpustakaan,
      status: req.body.status,
      image: location,
      condition: req.body.condition,
      isPromotion: req.body.isPromotion ? req.body.isPromotion : false,
    })
      .then(response => {
        // console.log("response", response.id)
        const createListBorrowBook = ListBorrowBook.create({
          bookId: response.id,
        });

        if (!createListBorrowBook) {
          return res.status(404).send('Failed create Book');
        }

        return res.status(201).json({
          message: 'Process Succesfully create Book',
          data: response,
        });
      })
      .catch(err => res.status(500).send(err));
  },

  update: async (req, res) => {
    return Books.findByPk(req.params.id)

      .then(book => {
        if (!book) {
          return res.status(400).send({ message: 'Book not found' });
        }

        let location = req.body.image
          ? req.body.image
          : `${process.env.SERVER_BACKEND}/img/images/${req.file.filename}`;
        return book
          .update({
            kategori: req.body.kategori,
            judul: req.body.judul,
            pengarang: req.body.pengarang,
            tahunTerbit: req.body.tahunTerbit,
            description: req.body.description,
            stockBuku: req.body.stockBuku,
            tanggalTerbit: req.body.tanggalTerbit,
            isbn: req.body.isbn,
            bahasa: req.body.bahasa,
            penerbit: req.body.penerbit,
            lokasiPerpustakaan: req.body.lokasiPerpustakaan,
            status: req.body.status,
            image: req.file ? location : req.file,
            condition: req.body.condition,
            isPromotion: req.body.isPromotion ? req.body.isPromotion : false,
          })
          .then(response => {
            res.status(200).json({ message: 'successfully update book', data: response });
          })
          .catch(err => res.status(404).send(err));
      })
      .catch(error => res.status(500).json({ test: error }));
  },

  uploadBook: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload an excel file!');
      }

      let path = __basedir + '/server/public/document/' + req.file.filename;

      readXlsxFile(path).then(rows => {
        // skip header
        rows.shift();

        let Databooks = [];

        rows.forEach(row => {
          let rowBook = {
            kategori: row[0],
            judul: row[1],
            pengarang: row[2],
            tahunTerbit: row[3],
            description: row[4],
            stockBuku: row[5],
            tanggalTerbit: row[6],
            isbn: row[7],
            bahasa: row[8],
            penerbit: row[9],
            lokasiPerpustakaan: row[10],
            status: row[11],
            condition: row[12],
            image: row[13],
            isPromotion: false,
          };

          Databooks.push(rowBook);
        });

        Books.bulkCreate(Databooks)
          .then(response => {
            response.map(item => {
              return ListBorrowBook.create({
                bookId: item.id,
              });
            });
            return res.status(200).json({
              message: 'Uploaded the file successfully: ' + req.file.originalname,
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'Fail to import data into database!',
              error: error.message,
            });
          });
      });
    } catch (error) {
      res.status(500).json({
        message: 'Could not upload the file: ' + req.file.originalname,
      });
    }
  },

  delete: async (req, res) => {
    return Books.findByPk(req.params.id)
      .then(book => {
        if (!book) {
          return res.status(404).send({ message: 'Book not found' });
        }
        ListBorrowBook.findAll({ where: { bookId: req.params.id } }).then(listBorrow => {
          listBorrow[0].destroy().then(() => {
            book
              .destroy()
              .then(() => res.status(200).send({ message: 'succesfully delete' }))
              .catch(error => res.status(404).send(error));
          })
        })

      })
      .catch(error => res.status(500).send(error));
  },
};
