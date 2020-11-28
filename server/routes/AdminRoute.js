const express = require('express');
const router = express.Router();
const { AuthJWT } = require('../middelwares');
const UploadDocument = require('../middelwares/uploadDocument');
const UploadImage = require('../middelwares/uploadImage');
const BookController = require('../controllers/bookController');
const EbookController = require('../controllers/ebookController');
const UserManageController = require('../controllers/UserManageController');
const RepositoryController = require('../controllers/repositoryController');
const TransactionBookController = require('../controllers/transactionBookController');
const TransactionEbookController = require('../controllers/transactionEbookController');
const WilayahController = require('../controllers/wilayahController');
const DashboardController = require('../controllers/dashboardController');

router.get('/manage-user', [AuthJWT.isAdmin], UserManageController.list);
router.post(
  '/manage-user/userIntoAdmin/:id',
  [AuthJWT.isAdmin, AuthJWT.isSuperAdmin],
  UserManageController.toggleUserIsAdmin
);
router.post(
  '/manage-user/delete/:id',
  [AuthJWT.isAdmin, AuthJWT.isSuperAdmin],
  UserManageController.deleteUser
);
router.get('/listUser', [AuthJWT.isAdmin], UserManageController.dataSourceUserList);
router.get('/manage-user/export', [AuthJWT.isAdmin], UserManageController.exportListUser);

//routing admin panel feature

router.get('/dashboard', DashboardController.dashboardSummary);

router.post('/book', [AuthJWT.isAdmin], BookController.list);
router.get('/book/:id', [AuthJWT.isAdmin], BookController.getById);
router.post('/book/create', [AuthJWT.isAdmin], UploadImage.single('image'), BookController.add);
router.put('/book/:id', [AuthJWT.isAdmin], UploadImage.single('image'), BookController.update);
router.post(
  '/book/upload',
  [AuthJWT.isAdmin],
  UploadDocument.single('file'),
  BookController.uploadBook
);
router.delete('/book/:id', [AuthJWT.isAdmin], BookController.delete);

router.post('/ebook', [AuthJWT.isAdmin], EbookController.list);
router.get('/ebook/:id', [AuthJWT.isAdmin], EbookController.getById);
router.post('/ebook/create', [AuthJWT.isAdmin], UploadImage.single('image'), EbookController.add);
router.put('/ebook/:id', [AuthJWT.isAdmin], UploadImage.single('image'), EbookController.update);
router.post(
  '/ebook/upload',
  [AuthJWT.isAdmin],
  UploadDocument.single('file'),
  EbookController.uploadEbook
);
router.delete('/ebook/:id', [AuthJWT.isAdmin], EbookController.delete);

router.get('/repository', [AuthJWT.verifyToken], RepositoryController.list);
router.get('/repository/:id', [AuthJWT.verifyToken], RepositoryController.getById);
router.get('/repository_approval', [AuthJWT.verifyToken], RepositoryController.approval);
router.post('/repository', [AuthJWT.verifyToken], RepositoryController.add);
router.put('/repository/:id', [AuthJWT.verifyToken], RepositoryController.update);
router.delete('/repository/:id', [AuthJWT.verifyToken], RepositoryController.delete);

router.post('/wilayah', WilayahController.list);
router.get('/wilayah/:id', [AuthJWT.isAdmin], WilayahController.getById);
router.post('/wilayah/create', [AuthJWT.isAdmin], WilayahController.add);
router.put('/wilayah/:id', [AuthJWT.isAdmin], WilayahController.update);
router.delete('/wilayah/:id', [AuthJWT.isAdmin], WilayahController.delete);
router.post(
  '/wilayah/upload',
  [AuthJWT.isAdmin],
  UploadDocument.single('file'),
  WilayahController.uploadWilayah
);

router.post('/transactionBook/list', [AuthJWT.isAdmin], TransactionBookController.list);
router.post('/transactionBook/history', [AuthJWT.isAdmin], TransactionBookController.listHistory);
router.get(
  '/transactionBook/history/export',
  [AuthJWT.isAdmin],
  TransactionBookController.exportListHistoryBook
);
router.post(
  '/transactionBook/return/:transactionId',
  [AuthJWT.isAdmin],
  TransactionBookController.returnABook
);
router.post(
  '/transactionBook/update/:transactionId',
  [AuthJWT.isAdmin],
  TransactionBookController.updateTransactionBook
);

router.post('/transactionEbook/list', [AuthJWT.isAdmin], TransactionEbookController.list);
router.post('/transactionEbook/history', [AuthJWT.isAdmin], TransactionEbookController.listHistory);
router.get(
  '/transactionEbook/history/export',
  [AuthJWT.isAdmin],
  TransactionEbookController.exportListHistoryEbook
);
router.post(
  '/transactionEbook/return/:transactionId',
  [AuthJWT.isAdmin],
  TransactionEbookController.returnEbook
);
router.post(
  '/transactionEbook/update/:transactionId',
  [AuthJWT.isAdmin],
  TransactionEbookController.updateTransactionEbook
);

module.exports = router;
