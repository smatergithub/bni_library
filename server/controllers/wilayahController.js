const Wilayah = require('../models/').wilayah;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const readXlsxFile = require('read-excel-file/node');

module.exports = {
  list: async (req, res) => {
    let { q, limit, page, order, sort } = req.body;
    let paramQuerySQL = {};

    if (q != '' && typeof q !== 'undefined') {
      paramQuerySQL.where = {
        codeWilayah: {
          [Op.like]: '%' + q + '%',
        },
        wilayah: {
          [Op.like]: '%' + q + '%',
        },
        alamat: {
          [Op.like]: '%' + q + '%',
        },
      };
    }

    // if (wilayah != '' && typeof wilayah !== 'undefined') {
    //   paramQuerySQL.where = {
    //     wilayah: {
    //       [Op.like]: '%' + wilayah + '%',
    //     },
    //   };
    // }

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

    return await Wilayah.findAndCountAll(paramQuerySQL)
      .then(response => {
        let totalPage = Math.ceil(response.count / req.body.limit);
        let page = Math.ceil(req.body.page);
        res.status(200).json({
          count: response.count,
          totalPage: totalPage,
          activePage: page,
          data: response.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getById: async (req, res) => {
    return Wilayah.findByPk(req.params.id)
      .then(response => {
        if (!response) {
          return res.status(404).send({
            message: 'Wilayah Not Found',
          });
        }
        return res.status(200).send(response);
      })
      .catch(error => res.status(500).send(error));
  },

  add: async (req, res) => {
    return Wilayah.create({
      codeWilayah: req.body.codeWilayah,
      wilayah: req.body.wilayah,
      alamat: req.body.alamat,
      linkGoogleMap: req.body.linkGoogleMap,
    })
      .then(response =>
        res.status(201).json({ message: 'successfully create wilayah', data: response })
      )
      .catch(err => res.status(500).send(err));
  },

  update: async (req, res) => {
    return Wilayah.findByPk(req.params.id)
      .then(wilayah => {
        if (!wilayah) {
          return res.status(400).send({ message: 'wilayah not found' });
        }
        return wilayah
          .update({
            codeWilayah: req.body.codeWilayah,
            wilayah: req.body.wilayah,
            alamat: req.body.alamat,
            linkGoogleMap: req.body.linkGoogleMap,
          })
          .then(response =>
            res.status(200).json({ message: 'successfully update wilayah', data: response })
          )
          .catch(err => res.status(404).send(err));
      })
      .catch(error => res.status(500).send(error));
  },

  uploadWilayah: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload an excel file!');
      }

      let path = __basedir + '/server/public/document/' + req.file.filename;

      readXlsxFile(path).then(rows => {
        // skip header
        rows.shift();

        let dataWilayah = [];

        rows.forEach(row => {
          let rowWilayah = {
            codeWilayah: row[0],
            wilayah: row[1],
            alamat: row[2],
            linkGoogleMap: row[3],
          };

          dataWilayah.push(rowWilayah);
        });

        Wilayah.bulkCreate(dataWilayah)
          .then(response => {
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
    return Wilayah.findByPk(req.params.id)
      .then(wilayah => {
        if (!wilayah) {
          return res.status(404).send({ message: 'wilayah not found' });
        }
        return wilayah
          .destroy()
          .then(() => res.status(200).send({ message: 'succesfully delete' }))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(500).send(error));
  },
};
