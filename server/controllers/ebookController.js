const Ebooks = require('../models/').ebooks;
const ListBorrowEbook = require('../models').listBorrowEbook;
const UploadFile = require('../models').uploadFile;
const Sequelize = require('sequelize');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fetch = require('node-fetch');
const Op = Sequelize.Op;
require('dotenv').config();

const readXlsxFile = require('read-excel-file/node');

module.exports = {
  getEbookList: async (req, res) => {
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
    paramQuerySQL.attributes = { exclude: ['sourceLink'] };

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
  getEbookPreviewById: async (req, res) => {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({
            message: 'Ebook Not Found',
          });
        } else {
          async function copyPages() {
            // Fetch first existing PDF document

            const firstDonorPdfBytes = await fetch(ebook.sourceLink).then(res => res.arrayBuffer());
            const firstDonorPdfDoc = await PDFDocument.load(firstDonorPdfBytes);

            // Create a new PDFDocument

            const pdfDoc = await PDFDocument.create();
            if (firstDonorPdfDoc.getPageCount() > 10) {
              // Copy the 1st page from the first donor document, and
              for (let i = 0; i < 10; i++) {
                const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [i]);
                // Add the first copied page
                pdfDoc.addPage(firstDonorPage);
              }
            } else if (firstDonorPdfDoc.getPageCount() > 5) {
              for (let i = 0; i < 2; i++) {
                const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [i]);
                // Add the first copied page
                pdfDoc.addPage(firstDonorPage);
              }
            } else {
              const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [0]);
              // Add the first copied page
              pdfDoc.addPage(firstDonorPage);
            }

            // Insert the second copied page to index 0, so it will be the
            // first page in `pdfDoc`
            // pdfDoc.insertPage(0, secondDonorPage);

            // Serialize the PDFDocument to bytes (a Uint8Array)
            const pdfBytes = await pdfDoc.save();
            res.type('pdf');
            var array = Array.from(pdfBytes);

            res.status(200).send(array);
          }
          copyPages();
        }
      })
      .catch(error => res.status(500).send(error));
  },
  getEbookById: async (req, res) => {
    let paramQuerySQL = {
      include: ['ebook', 'transactionEbook', 'user'],
      where: {
        ebookId: req.params.id,
      },
    };
    return await ListBorrowEbook.findAll(paramQuerySQL)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({
            message: 'ebook Not Found',
          });
        }
        ebook[0]['ebook'].sourceLink = '';
        return res.status(200).send(ebook[0]);
      })
      .catch(error => res.status(500).send(error));
  },

  list: async (req, res) => {
    // let { judul, kategori, tahunTerbit, limit, page, order, sort } = req.body;
    let { limit, page } = req.body;
    let paramQuerySQL = {
      include: ['ebook', 'transactionEbook', 'user'],
    };

    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }

    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.body.limit);
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
    return await ListBorrowEbook.findAndCountAll(paramQuerySQL)
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
    let paramQuerySQL = {
      include: ['ebook', 'transactionEbook', 'user'],
      where: {
        ebookId: req.params.id,
      },
    };
    return await ListBorrowEbook.findAll(paramQuerySQL)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({
            message: 'ebook Not Found',
          });
        }
        return res.status(200).send(ebook[0]);
      })
      .catch(error => res.status(500).send(error));
  },

  add: async (req, res) => {
    let location = `${process.env.SERVER_BACKEND}/img/images/${req.file.filename}`;

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
      image: location,

      sourceLink: req.body.sourceLink,
      condition: req.body.condition,
      isPromotion: req.body.isPromotion ? req.body.isPromotion : false,
    })
      .then(response => {
        const createListBorrowEbook = ListBorrowEbook.create({
          EbookId: response.id,
        });

        if (!createListBorrowEbook) {
          return res.status(404).send('Failed create Ebook');
        }

        return res.status(201).json({
          message: 'Process Succesfully create Ebook',
          data: response,
        });
      })

      .catch(err => res.status(500).send(err));
  },

  uploadEbook: async (req, res) => {
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
            sourceLink: row[14],
            isPromotion: false,
          };

          Databooks.push(rowBook);
        });

        Ebooks.bulkCreate(Databooks)
          .then(response => {
            response.map(item => {
              return ListBorrowEbook.create({
                ebookId: item.id,
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

  update: async (req, res) => {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(400).send({ message: 'Ebook not found' });
        }

        let location = req.body.image
          ? req.body.image
          : `${process.env.SERVER_BACKEND}/img/images/${req.file.filename}`;

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
            image: req.file ? location : req.file,

            sourceLink: req.body.sourceLink,
            condition: req.body.condition,
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
        ListBorrowEbook.findAll({ where: { ebookId: req.params.id } }).then(listBorrow => {
           if(listBorrow[0].dataValues.transactionEbookId !== null && listBorrow[0].dataValues.transactionEbookId !== undefined){
               listBorrow[0].destroy().then(() => {
                  ebook
                    .destroy()
                    .then(() => res.status(200).send({ message: 'succesfully delete' }))
                    .catch(error => res.status(404).send(error));
                });
          }
          else{
            res.status(404).send({ message: 'buku ini sedang dipakai di transaksi lainnya' })
          }

        });
      })
      .catch(error => res.status(500).send(error));
  },
};
