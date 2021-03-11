const Repositorys = require('../models/').repository;
const UploadMultipleDocument = require('../middelwares/uploadMultipleDocument');
const Sequelize = require('sequelize');
const fetch = require('node-fetch');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const Op = Sequelize.Op;
require('dotenv').config();

function generateFileLocation(file) {
  return `${process.env.SERVER_BACKEND}/img/documentRepository/${file}`;
}
var LINK = function() {
  return (
    '_' +
    Math.random()
      .toString(10)
      .substr(2, 9)
  );
};
module.exports = {
  list: async (req, res) => {
    // queryStrings
    let { q, order, title, category, sort, limit, page } = req.query;

    let paramQuerySQL = {};
    if (category != '' && typeof category !== 'undefined') {
      paramQuerySQL.attributes = [
        'id',
        'name',
        'title',
        'methodology',
        'university',
        'faculty',
        'strata',
        'releaseYear',
        'description',
        'isApproved',
        'category',
      ];
      paramQuerySQL.where = {
        [Op.and]: {
          category: {
            [Op.like]: '%' + category + '%',
          },
          title: {
            [Op.like]: '%' + title + '%',
          },
        },
        isApproved: true,
      };
    }
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

    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.query.limit);
    }

    // sort par defaut si param vide ou inexistant
    if (typeof sort === 'undefined' || sort == '') {
      sort = 'ASC';
    }
    // order by
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }

    return Repositorys.findAndCountAll(paramQuerySQL)
      .then(repository => {
        let totalPage = Math.ceil(repository.count / paramQuerySQL.limit);

        res.status(200).json({
          totalPage: totalPage,
          activePage: Number(page),
          data: repository.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  approval: async (req, res) => {
    // queryStrings

    let { q, order, sort, limit, page } = req.query;
    let paramQuerySQL = {
      limit: 10,
      page: 1,
    };

    paramQuerySQL.where = {
      isApproved: false,
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

    // offset
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.query.limit);
    }

    // sort par defaut si param vide ou inexistant
    if (typeof sort === 'undefined' || sort == '') {
      sort = 'ASC';
    }
    // order by
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }

    return Repositorys.findAndCountAll(paramQuerySQL)
      .then(result => {
        let totalPage = Math.ceil(result.count / paramQuerySQL.limit);
        res.status(200).json({
          totalPage: totalPage,
          activePage: Number(page),
          data: result.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getById: async (req, res) => {
    return Repositorys.findByPk(req.params.id)
      .then(repository => {
        if (!repository) {
          return res.status(404).send({
            message: 'repository Not Found',
          });
        }
        if (repository.abstrack) {
          repository['abstrack'] = LINK();
        }
        if (repository.document) {
          repository['document'] = LINK();
        }

        return res.status(200).send(repository);
      })
      .catch(error => res.status(500).send(error));
  },
  getPreviewById: async (req, res) => {
    let { type } = req.query;
    return Repositorys.findByPk(req.params.id)
      .then(repository => {
        if (!repository) {
          return res.status(404).send({
            message: 'repository Not Found',
          });
        } else {
          if (repository[type]) {
            console.log('aaa', repository[type]);
            async function copyPages() {
              // Fetch first existing PDF document

              const firstDonorPdfBytes = await fetch(repository[type]).then(res =>
                res.arrayBuffer()
              );
              const firstDonorPdfDoc = await PDFDocument.load(firstDonorPdfBytes);

              // Create a new PDFDocument

              const pdfDoc = await PDFDocument.create();

              // Copy the 1st page from the first donor document, and
              for (let i = 0; i < firstDonorPdfDoc.getPageCount(); i++) {
                const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [i]);
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
          } else {
            res.status(500).send({ message: 'Dokumen tidak di temukan' });
          }
        }
      })
      .catch(error => res.status(500).send(error));
  },
  add: async (req, res) => {
    UploadMultipleDocument(req, res, err => {
      if (typeof req.files == 'undefined') {
        return res.status(400).json({
          message: 'Document dan Abstrack Tidak Ditemukan',
        });
      }

      return Repositorys.create({
        name: req.body.name,
        title: req.body.title,
        methodology: req.body.methodology,
        university: req.body.university,
        faculty: req.body.faculty,
        strata: req.body.strata,
        description: req.body.description,
        releaseYear: req.body.releaseYear,
        category: req.body.category,
        city: req.body.city,
        isApproved: false,
        document:
          req.files['document'] !== undefined
            ? generateFileLocation(req.files['document'][0].filename)
            : null,
        abstrack:
          req.files['abstrack'] !== undefined
            ? generateFileLocation(req.files['abstrack'][0].filename)
            : null,
      })
        .then(response =>
          res.status(201).json({ message: 'Succesfully Create Repository', data: response })
        )
        .catch(err => res.status(500).send(err));
    });
  },

  update: async (req, res) => {
    UploadMultipleDocument(req, res, err => {
      if (err) throw err;
      return Repositorys.findByPk(req.params.id)
        .then(repo => {
          if (!repo) {
            return res.status(400).send({ message: 'repo not found' });
          }

          return repo
            .update({
              name: req.body.name,
              title: req.body.title,
              methodology: req.body.methodology,
              university: req.body.university,
              faculty: req.body.faculty,
              strata: req.body.strata,
              description: req.body.description,
              releaseYear: req.body.releaseYear,
              category: req.body.category,
              city: req.body.city,
              isApproved: req.body.isApproved,
              document:
                req.files['document'] !== undefined
                  ? generateFileLocation(req.files['document'][0].filename)
                  : repo.document,
              abstrack:
                req.files['abstrack'] !== undefined
                  ? generateFileLocation(req.files['abstrack'][0].filename)
                  : repo.abstrack,
            })
            .then(response =>
              res.status(201).json({ message: 'Succesfully Create Repository', data: response })
            )
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
    });
  },

  delete: async (req, res) => {
    return Repositorys.findByPk(req.params.id)
      .then(repository => {
        if (!repository) {
          return res.status(404).send({ message: 'repository not found' });
        }
        return repository
          .destroy()
          .then(() => res.status(200).send({ message: 'succesfully delete' }))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(500).send(error));
  },
};
