var express = require('express');
var router = express.Router();
var { verifySignUp, AuthJWT } = require('../middelwares');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var options = require('./configSwagger');

//controller
const AuthenticationController = require('../controllers/authenticationController');
const BookController = require('../controllers/bookController');
const EbookController = require('../controllers/ebookController');
const UserController = require('../controllers/userController');
const RepositoryController = require("../controllers/repositoryController");


//routing authentication and register
router.post(
  '/auth/register',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  AuthenticationController.register
);
router.post('/auth/login', AuthenticationController.login);
router.get('/auth/profile', [AuthJWT.verifyToken], AuthenticationController.profileUser);

router.get('/users', [AuthJWT.isAdmin], UserController.list);
router.post('/users/:id', [AuthJWT.isAdmin, AuthJWT.isSuperAdmin], UserController.toggleUserIsAdmin);


//routing user feature

router.get('/book/getAll', BookController.list);
router.get('/bookDetail/:id', BookController.getById);

router.get('/ebook/getAll', EbookController.list);
router.get('/ebookDetail/:id', EbookController.getById);

//routing admin panel feature

router.get('/books', [AuthJWT.isAdmin], BookController.list);
router.get('/books/:id', [AuthJWT.isAdmin], BookController.getById);
router.post('/books', [AuthJWT.isAdmin], BookController.add);
router.put('/books/:id', [AuthJWT.isAdmin], BookController.update);
router.delete('/books/:id', [AuthJWT.isAdmin], BookController.delete);


router.get('/ebooks', [AuthJWT.isAdmin], EbookController.list);
router.get('/ebooks/:id', [AuthJWT.isAdmin], EbookController.getById);
router.post('/ebooks', [AuthJWT.isAdmin], EbookController.add);
router.put('/ebooks/:id', [AuthJWT.isAdmin], EbookController.update);
router.delete('/ebooks/:id', [AuthJWT.isAdmin], EbookController.delete);

router.get('/repository', [AuthJWT.isAdmin], RepositoryController.list);
router.get('/repository/:id', [AuthJWT.isAdmin], RepositoryController.getById);
router.post('/repository', [AuthJWT.isAdmin], RepositoryController.add);
router.delete('/repository/:id', [AuthJWT.isAdmin], RepositoryController.delete);



//docs swagger
const specs = swaggerJsdoc(options);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(specs, { explorer: true }));

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = router;
