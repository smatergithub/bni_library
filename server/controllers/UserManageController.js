const Users = require('../models').users;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const xl = require('excel4node');

module.exports = {
  list: async (req, res) => {
    // queryStrings
    let { q, order, sort, limit, page } = req.query;
    let paramQuerySQL = {};

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

    return Users.findAndCountAll(paramQuerySQL)
      .then(user => {
        let data = [];
        user.rows.forEach(item => {
          let dataUser = {
            id: item.id,
            npp: item.npp,
            nama: item.nama,
            phoneNumber: item.phoneNumber,
            tanggalLahir: item.tanggalLahir,
            wilayah: item.wilayah,
            singkatan: item.singkatan,
            kdunit: item.kdunit,
            unitBesaran: item.unitBesaran,
            unit: item.unit,
            jenjang: item.jenjang,
            jabatan: item.jabatan,
            alamat: item.alamat,
            email: item.email,
            isAdmin: item.isAdmin,
            superAdmin: item.superAdmin,
            isRepoAdmin: item.isRepoAdmin,
          };
          data.push(dataUser);
        });
        let totalPage = Math.ceil(user.count / paramQuerySQL.limit);
        let page = Math.ceil(req.query.page);
        res.status(200).json({
          count: user.count,
          totalPage: totalPage,
          activePage: page,
          data: data,
        });
      })
      .catch(error => {
        res.status(404).send(error);
      });
  },

  deleteUser: async (req, res) => {
    return Users.findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({ message: 'succesfully delete' }))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(500).send(error));
  },

  toggleUserIsAdmin: async (req, res) => {
    return Users.findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        let requestAdmin = user.isAdmin === true ? false : true;
        return user
          .update({
            isAdmin: requestAdmin,
          })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(404).send(error));
  },
  toggleUserIsRepoAdmin: async (req, res) => {
    return Users.findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        let requestAdmin = user.isAdmin === true ? false : true;
        return user
          .update({
            isRepoAdmin: req.body.isRepoAdmin,
          })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(404).send(error));
  },

  dataSourceUserList: async (req, res) => {
    return Users.findAll()
      .then(user => {
        let userDisplay = [];
        user.forEach(item => {
          const userData = {
            value: item.id,
            label: item.name,
          };
          userDisplay.push(userData);
        });
        res.status(200).send(userDisplay);
      })
      .catch(error => res.status(404).send(error));
  },

  exportListUser: async (req, res) => {
    try {
      const from = req.query.from;
      const to = req.query.to;

      if (!from || !to) {
        return res.status(400).json({ message: 'Tolong Input Tanggal Terlebih Dahulu' });
      }

      const users = await Users.findAll({
        where: {
          createdAt: {
            [Op.between]: [from, to],
          },
        },
      });

      const wb = new xl.Workbook();
      const ws = wb.addWorksheet('Sheet 1');

      let userDisplay = [];

      if (users.length == 0) {
        return res.status(500).json({ message: 'Data Laporan Tidak Ditemukan' });
      } else {
        users.forEach(item => {
          const userData = {
            ...item.dataValues,
          };
          userDisplay.push(userData);
        });

        // header
        let headingColumnIndex = 1;
        Object.keys(userDisplay[0]).forEach(key => {
          if (key != 'isAdmin' && key != 'superAdmin' && key != 'isRepoAdmin') {
            ws.cell(1, headingColumnIndex++).string(key);
          }
        });

        //Write Data in Excel file
        let rowIndex = 2;
        userDisplay.forEach(record => {
          let columnIndex = 1;
          Object.keys(record).forEach(columnName => {
            if (
              columnName != 'isAdmin' &&
              columnName != 'superAdmin' &&
              columnName != 'isRepoAdmin'
            ) {
              ws.cell(rowIndex, columnIndex++).string(
                record[columnName] == null ? '' : record[columnName].toString()
              );
            }
          });
          rowIndex++;
        });

        wb.write(`Report User - ${new Date().getTime() / 1000}.xlsx`, res);
        // res.writeHead(200, [['Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']]);
        // wb.writeToBuffer('Excel.xlsx').then((buffer) => {
        //   res.end(new Buffer(buffer, 'base64'));
        // });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
