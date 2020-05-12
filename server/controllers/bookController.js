const Books = require('../models').books;
const UnitTypes = require('../models').unittypes;
const Categories = require('../models').categories;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname + './../public/images/'),
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
}).single('image');

module.exports = {
  list(req, res) {
    return Books.findAll({
      include: [
        { model: UnitTypes, as: 'unittypes' },
        { model: Categories, as: 'categories' },
      ],
      order: [['createdAt', 'DESC']],
    })

      .then(books => res.status(200).send(books))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Books.findByPk(req.params.id, {
      include: [
        { model: UnitTypes, as: 'unittypes' },
        { model: Categories, as: 'categories' },
      ],
    })
      .then(book => {
        if (!book) {
          return res.status(404).send({
            message: 'book Not Found',
          });
        }
        return res.status(200).send(book);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    upload(req, res, err => {
      if (err) throw err;
      return Books.create({
        code: req.body.code,
        title: req.body.title,
        description: req.body.description,
        image: req.file.path,
        author: req.body.author,
        transDate: req.body.transDate,
        unitTypeId: req.body.unitTypeId,
        categoryId: req.body.categoryId,
      })
        .then(response => res.status(200).send(response))
        .catch(err => res.status(400).send(err));
    });
  },

  update(req, res) {
    upload(req, res, err => {
      if (err) throw err;
      return Books.findByPk(req.params.id)
        .then(book => {
          if (!book) {
            return res.status(400).send({ message: 'Book not found' });
          }
          return book
            .update({
              code: req.body.code || book.code,
              title: req.body.title || book.title,
              description: req.body.description || book.description,
              image: req.file.path || book.image,
              author: req.body.author || book.author,
              transDate: req.body.transDate || book.transDate,
              unitTypeId: req.body.unitTypeId || book.unitTypeId,
              categoryId: req.body.categoryId || book.categoryId,
            })
            .then(response => res.status(200).send(response))
            .catch(err => res.status(400).send(err));
        })
        .catch(error => res.status(400).send(error));
    });
  },

  delete(req, res) {
    return Books.findByPk(req.params.id)
      .then(book => {
        if (!book) {
          return res.status(400).send({ message: 'Book not found' });
        }
        return book
          .destroy()
          .then(() => res.status(204).send({ message: 'succesfully delete' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
