const Users = require('../models').users;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  list: async (req, res) => {
    // queryStrings
    let { q, order, sort, limit, page, offset } = req.query;
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
    // page
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.page = parseInt(page);
    }
    // offset
    if (offset != '' && typeof offset !== 'undefined' && offset > 0) {
      paramQuerySQL.offset = parseInt(offset - 1);
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
            name: item.name,
            address: item.address,
            email: item.email,
            phoneNumber: item.phoneNumber,
            isAdmin: item.isAdmin,
            superAdmin: item.superAdmin,
          };
          data.push(dataUser);
        });
        let totalPage = Math.ceil(user.count / paramQuerySQL.limit);
        res.status(200).json({
          count: user.count,
          totalPage: totalPage,
          activePage: paramQuerySQL.page,
          data: data,
        });
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },

  toggleUserIsAdmin: async (req, res) => {
    return Users.findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return user
          .update({
            isAdmin: req.body.isAdmin,
          })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
