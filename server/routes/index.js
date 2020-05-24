var express = require('express');
var router = express.Router();
var { verifySignUp, AuthJWT } = require('../middelwares');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var options = require('./configSwagger');

//controller
const AuthenticationController = require('../controllers/authenticationController');
const CategoriesController = require('../controllers/categoriesController');
const BookController = require('../controllers/bookController');
const UserController = require('../controllers/userController');
const RepositoryController = require("../controllers/repositoryController");

//routing controller
router.post(
  '/auth/register',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  AuthenticationController.register
);
router.post('/auth/login', AuthenticationController.login);
router.get('/auth/profile', [AuthJWT.verifyToken], AuthenticationController.profileUser);

router.get('/users', [AuthJWT.isAdmin], UserController.list);
router.post('/users/:id', [AuthJWT.isAdmin, AuthJWT.isSuperAdmin], UserController.toggleUserIsAdmin);

router.get('/categories', [AuthJWT.isAdmin], CategoriesController.list);
router.get('/categories/:id', [AuthJWT.isAdmin], CategoriesController.getById);
router.post('/categories', [AuthJWT.isAdmin], CategoriesController.add);
router.put('/categories/:id', [AuthJWT.isAdmin], CategoriesController.update);
router.delete('/categories/:id', [AuthJWT.isAdmin], CategoriesController.delete);



router.get('/books', [AuthJWT.isAdmin], BookController.list);
router.get('/books/:id', [AuthJWT.isAdmin], BookController.getById);
router.post('/books', [AuthJWT.isAdmin], BookController.add);
router.put('/books/:id', [AuthJWT.isAdmin], BookController.update);
router.delete('/books/:id', [AuthJWT.isAdmin], BookController.delete);


router.get('/repository', RepositoryController.list);
router.get('/repository/:id', RepositoryController.getById);
router.post('/repository', RepositoryController.add);
router.delete('/repository/:id', RepositoryController.delete);



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
