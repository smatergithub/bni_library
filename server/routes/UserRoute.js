var express = require('express');
var router = express.Router();
var { verifySignUp, AuthJWT } = require('../middelwares');

//controller
const AuthenticationController = require('../controllers/AuthenticationController');
const ProfileUserController = require('../controllers/ProfileUserController');
const BookController = require('../controllers/BookController');
const EbookController = require('../controllers/EbookController');
const DataSourceFilterBookController = require('../controllers/dataSourceFilterBookController');
const DataSourceFilterEbookController = require('../controllers/dataSourceFilterEbookController');
const TransactionBookController = require('../controllers/TransactionBookController');
const TransactionEbookController = require('../controllers/TransactionEbookController');
const RatingBookController = require('../controllers/ratingBookController');
const RatingEbookController = require('../controllers/ratingEbookController');
const Repository = require('../controllers/repositoryController');

router.post('/book/list', BookController.getBookList);
router.get('/book/detail/:id', BookController.getBookById);

router.get('/categoryBook', DataSourceFilterBookController.getCategory);
router.get('/tahunTerbitBook', DataSourceFilterBookController.getTahunTerbit);

router.post('/ebook/list', EbookController.getEbookList);
router.get('/ebook/detail/:id', EbookController.getEbookById);
router.get('/ebook/preview/:id', EbookController.getEbookPreviewById);

router.get('/categoryEbook', DataSourceFilterEbookController.getCategory);
router.get('/tahunTerbitEbook', DataSourceFilterEbookController.getTahunTerbit);

router.post(
  '/register',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  AuthenticationController.register
);
router.post('/login', AuthenticationController.login);
router.get('/logout', AuthenticationController.logout);
router.post('/verification', AuthenticationController.verificationAccount);
router.post('/resetPassword', AuthenticationController.resetPassword);
router.post('/updatePassword', AuthenticationController.updatePassword);
router.get('/profile/me', [AuthJWT.verifyToken], ProfileUserController.profileUser);
router.post('/profile/updateProfile', [AuthJWT.verifyToken], ProfileUserController.updateProfile);
router.get(
  '/profile/listBorrowBook',
  [AuthJWT.verifyToken],
  ProfileUserController.listBorrowBookUser
);
router.get(
  '/profile/listHistoryBorrowBook',
  [AuthJWT.verifyToken],
  ProfileUserController.listHistoryBorrowBookUser
);
router.get(
  '/profile/listHistoryBorrowEbook',
  [AuthJWT.verifyToken],
  ProfileUserController.listHistoryBorrowEbookUser
);

router.post(
  '/transactionBook/borrowBook',
  [AuthJWT.verifyToken],
  TransactionBookController.borrowBook
);
router.post(
  '/transactionEbook/borrowEbook',
  [AuthJWT.verifyToken],
  TransactionEbookController.borrowEbook
);

router.post('/ratingBook', [AuthJWT.verifyToken], RatingBookController.inputRatingBook);
router.post('/ratingEbook', [AuthJWT.verifyToken], RatingEbookController.inputRatingEbook);

router.post('/repository', [AuthJWT.verifyToken], Repository.add);
router.get('/repository', [AuthJWT.verifyToken], Repository.list);
router.get('/repository/:id', [AuthJWT.verifyToken], Repository.getById);

router.get('/ratingBook/list', RatingBookController.listBookbyRating);
router.get('/ratingEbook/list', RatingEbookController.listEbookbyRating);
module.exports = router;
