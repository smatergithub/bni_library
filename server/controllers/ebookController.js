const Ebooks = require('../models/').ebooks;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const readXlsxFile = require('read-excel-file/node');

module.exports = {
  getEbookList: async (req, res) => {
    let { judul, kategori, tahunTerbit, limit, page, order, sort } = req.body;
    let paramQuerySQL = {};

    if (judul != '' && typeof judul !== 'undefined') {
      paramQuerySQL.where = {
        judul: {
          [Op.like]: '%' + judul + '%',
        },
      };
    }
    if (kategori != '' && typeof kategori !== 'undefined') {
      paramQuerySQL.where = {
        kategori: {
          [Op.like]: '%' + kategori + '%',
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

    return await Ebooks.findAndCountAll(paramQuerySQL)
      .then(ebook => {
        let activePage = Math.ceil(ebook.count / req.body.limit);
        let page = req.body.page;
        res.status(200).json({
          count: ebook.count,
          totalPage: activePage,
          activePage: page,
          data: ebook.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getEbookById: async (req, res) => {
    return await Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({
            message: 'ebook Not Found',
          });
        }
        return res.status(200).send(ebook);
      })
      .catch(error => res.status(500).send(error));
  },

  list: async (req, res) => {
    let { judul, kategori, tahunTerbit, limit, page, order, sort } = req.body;
    let paramQuerySQL = {};

    if (judul != '' && typeof judul !== 'undefined') {
      paramQuerySQL.where = {
        judul: {
          [Op.like]: '%' + judul + '%',
        },
      };
    }
    if (kategori != '' && typeof kategori !== 'undefined') {
      paramQuerySQL.where = {
        kategori: {
          [Op.like]: '%' + kategori + '%',
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

    return await Ebooks.findAndCountAll(paramQuerySQL)
      .then(ebook => {
        let totalPage = Math.ceil(ebook.count / req.body.limit);
        let page = Math.ceil(req.body.page);
        res.status(200).json({
          count: ebook.count,
          totalPage: totalPage,
          activePage: page,
          data: ebook.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getById: async (req, res) => {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({
            message: 'Ebook Not Found',
          });
        }
        return res.status(200).send(ebook);
      })
      .catch(error => res.status(500).send(error));
  },

  add: async (req, res) => {
    // let path =
    //   __basedir + "/server/public/images/" + req.file.filename;

    return Ebooks.create({
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
      image: req.file.path,
      sourceLink: req.body.sourceLink,
      isPromotion: req.body.isPromotion ? req.body.isPromotion : false,
    })
      .then(response =>
        res.status(201).json({ message: 'successfully create ebook', data: response })
      )
      .catch(err => res.status(500).send(err));
  },

  uploadEbook: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload an excel file!');
      }

      let path = __basedir + '/server/public/documentBook/' + req.file.filename;

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
            image: row[12],
            sourceLink: row[13],
            isPromotion: false,
          };

          Databooks.push(rowBook);
        });

        Ebooks.bulkCreate(Databooks)
          .then(() => {
            res.status(200).json({
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

  update: async (req, res) => {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(400).send({ message: 'Ebook not found' });
        }

        // let path =
        //   __basedir + "/server/public/images/" + req.file.filename;

        return ebook
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
            image: req.file ? req.file.path : req.body.image,
            sourceLink: req.body.sourceLink,
            isPromotion: req.body.isPromotion ? req.body.isPromotion : false,
          })
          .then(response =>
            res.status(200).json({ message: 'successfully update Ebook', data: response })
          )
          .catch(err => res.status(404).send(err));
      })
      .catch(error => res.status(500).send(error));
  },

  delete: async (req, res) => {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({ message: 'Ebook not found' });
        }
        return ebook
          .destroy()
          .then(() => res.status(200).send({ message: 'succesfully delete' }))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(500).send(error));
  },
};
