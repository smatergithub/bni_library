const Repositorys = require('../models/').repository;
const UploadMultipleDocument = require('../middelwares/uploadMultipleDocument');
const Sequelize = require('sequelize');
const fetch = require('node-fetch');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const Op = Sequelize.Op;

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
        'category',
        'university',
        'releaseYear',
        'type',
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

  getById: async (req, res) => {
    return Repositorys.findByPk(req.params.id)
      .then(repository => {
        if (!repository) {
          return res.status(404).send({
            message: 'repository Not Found',
          });
        }
        if (repository.abstrack) {
          repository[abstrack] = LINK();
        }
        if (repository.bab1) {
          repository['bab1'] = LINK();
        }
        if (repository.bab2) {
          repository['bab2'] = LINK();
        }
        if (repository.bab3) {
          repository['bab3'] = LINK();
        }
        if (repository.bab4) {
          repository['bab4'] = LINK();
        }
        if (repository.bab5) {
          repository['bab5'] = LINK();
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
          async function copyPages() {
            // Fetch first existing PDF document

            const firstDonorPdfBytes = await fetch(repository[type]).then(res => res.arrayBuffer());
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
  add: async (req, res) => {
    // console.log('')

    UploadMultipleDocument(req, res, err => {
      if (err) throw err;
      return Repositorys.create({
        name: req.body.name,
        title: req.body.title,
        category: req.body.category,
        university: req.body.university,
        editor: req.body.editor,
        translateBy: req.body.translateBy,
        description: req.body.description,
        releaseYear: req.body.releaseYear,
        type: req.body.type,
        city: req.body.city,
        bab1:
          req.files['bab1'] !== undefined
            ? generateFileLocation(req.files['bab1'][0].filename)
            : null,
        bab2:
          req.files['bab2'] !== undefined
            ? generateFileLocation(req.files['bab2'][0].filename)
            : null,
        bab3:
          req.files['bab3'] !== undefined
            ? generateFileLocation(req.files['bab3'][0].filename)
            : null,
        bab4:
          req.files['bab4'] !== undefined
            ? generateFileLocation(req.files['bab4'][0].filename)
            : null,
        bab5:
          req.files['bab5'] !== undefined
            ? generateFileLocation(req.files['bab5'][0].filename)
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
              category: req.body.category,
              university: req.body.university,
              editor: req.body.editor,
              translateBy: req.body.translateBy,
              description: req.body.description,
              releaseYear: req.body.releaseYear,
              type: req.body.type,
              city: req.body.city,
              bab1:
                req.files['bab1'] !== undefined
                  ? generateFileLocation(req.files['bab1'][0].filename)
                  : null,
              bab2:
                req.files['bab2'] !== undefined
                  ? generateFileLocation(req.files['bab2'][0].filename)
                  : null,
              bab3:
                req.files['bab3'] !== undefined
                  ? generateFileLocation(req.files['bab3'][0].filename)
                  : null,
              bab4:
                req.files['bab4'] !== undefined
                  ? generateFileLocation(req.files['bab4'][0].filename)
                  : null,
              bab5:
                req.files['bab5'] !== undefined
                  ? generateFileLocation(req.files['bab5'][0].filename)
                  : null,
              abstrack: req.files['abstrack'] !== undefined ? req.files['abstrack'][0] : null,
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
