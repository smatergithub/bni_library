var express = require('express');
var router = express.Router();
var { verifySignUp, AuthJWT } = require('../middelwares');

//controller
const AuthenticationController = require('../controllers/authenticationController');
const ProfileUserController = require('../controllers/ProfileUserController');
const BookController = require('../controllers/bookController');
const EbookController = require('../controllers/ebookController');
const DataSourceFilterBookController = require('../controllers/dataSourceFilterBookController');
const DataSourceFilterEbookController = require('../controllers/dataSourceFilterEbookController');
const TransactionBookController = require('../controllers/transactionBookController');
const TransactionEbookController = require('../controllers/transactionEbookController');
const RatingBookController = require('../controllers/ratingBookController');
const RatingEbookController = require('../controllers/ratingEbookController');
const CartController = require('../controllers/cartController');
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
router.post('/contact-us', AuthenticationController.contactUs);

router.post('/login', AuthenticationController.login);
router.get('/logout', AuthenticationController.logout);
router.get('/isValidToken', AuthenticationController.isTokenValid);
router.get('/profile/me', [AuthJWT.verifyToken], ProfileUserController.profileUser);
router.post('/profile/updateProfile', [AuthJWT.verifyToken], ProfileUserController.updateProfile);
router.get(
  '/profile/approveBorrow',
  [AuthJWT.verifyToken],
  ProfileUserController.approveBorrowBookAndEbook
);
router.get(
  '/profile/book/no-rated/:id',
  [AuthJWT.verifyToken],
  ProfileUserController.getBookListNeedRated
);
router.get(
  '/profile/ebook/no-rated/:id',
  [AuthJWT.verifyToken],
  ProfileUserController.getEbookListNeedRated
);

router.get(
  '/profile/listBorrowBook/:id',
  [AuthJWT.verifyToken],
  ProfileUserController.listBorrowBookUser
);
router.get(
  '/profile/listBorrowEbook/:id',
  [AuthJWT.verifyToken],
  ProfileUserController.listBorrowEbookUser
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

router.get('/ratingBook/list', [AuthJWT.verifyToken], RatingBookController.listRating);
router.get('/ratingEbook/list', [AuthJWT.verifyToken], RatingEbookController.listRating);

router.post('/repository', [AuthJWT.isRepoAdmin], Repository.add);
router.get('/repository', [AuthJWT.verifyToken], Repository.list);
router.get('/repository/:id', [AuthJWT.verifyToken], Repository.getById);
router.get('/repository/preview/:id', [AuthJWT.verifyToken], Repository.getPreviewById);
router.get('/ratingBook/list', RatingBookController.listBookbyRating);
router.get('/ratingEbook/list', RatingEbookController.listEbookbyRating);

router.get('/cart/list', [AuthJWT.verifyToken], CartController.list);
router.post('/cart/create', [AuthJWT.verifyToken], CartController.add);
router.delete('/cart/delete/:id', [AuthJWT.verifyToken], CartController.delete);
router.delete('/cart/deletebook/:id', [AuthJWT.verifyToken], CartController.deleteByBookId);
router.delete('/cart/deleteebook/:id', [AuthJWT.verifyToken], CartController.deleteByEbookId);
module.exports = router;
