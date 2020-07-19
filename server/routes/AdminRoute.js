const express = require('express');
const router = express.Router();
const { verifySignUp, AuthJWT } = require('../middelwares');
const UploadDocument = require("../middelwares/uploadDocument");
const UploadImage = require("../middelwares/uploadImage");
const BookController = require('../controllers/BookController');
const EbookController = require('../controllers/EbookController');
const UserManageController = require('../controllers/UserManageController');
const RepositoryController = require('../controllers/RepositoryController');
const TransactionBookController = require('../controllers/TransactionBookController');
const TransactionEbookController = require('../controllers/TransactionEbookController');

router.get('/manage-user', [AuthJWT.isAdmin], UserManageController.list);
router.post('/manage-user/:id', [AuthJWT.isAdmin, AuthJWT.isSuperAdmin], UserManageController.toggleUserIsAdmin);
router.get('/listUser', [AuthJWT.isAdmin], UserManageController.dataSourceUserList)
//routing admin panel feature

router.get('/book', [AuthJWT.isAdmin], BookController.list);
router.get('/book/:id', [AuthJWT.isAdmin], BookController.getById);
router.post('/book', [AuthJWT.isAdmin], UploadImage.single("image"), BookController.add);
router.put('/book/:id', [AuthJWT.isAdmin], UploadImage.single("image"), BookController.update);
router.post('/book/upload', [AuthJWT.isAdmin], UploadDocument.single("file"), BookController.uploadBook);
router.delete('/book/:id', [AuthJWT.isAdmin], BookController.delete);

router.get('/ebook', [AuthJWT.isAdmin], EbookController.list);
router.get('/ebook/:id', [AuthJWT.isAdmin], EbookController.getById);
router.post('/ebook', [AuthJWT.isAdmin], EbookController.add);
router.put('/ebook/:id', [AuthJWT.isAdmin], EbookController.update);
router.delete('/ebook/:id', [AuthJWT.isAdmin], EbookController.delete);

router.get('/repository', [AuthJWT.isAdmin], RepositoryController.list);
router.get('/repository/:id', [AuthJWT.isAdmin], RepositoryController.getById);
router.post('/repository', [AuthJWT.isAdmin], RepositoryController.add);
router.delete('/repository/:id', [AuthJWT.isAdmin], RepositoryController.delete);

router.post('/transactionBook', [AuthJWT.isAdmin], TransactionBookController.list);
router.post('/transactionBook/return/:transactionId', [AuthJWT.isAdmin], TransactionBookController.returnABook);


router.post('/transactionEbook', [AuthJWT.isAdmin], TransactionEbookController.list);
router.post('/transactionEbook/return/:transactionId', [AuthJWT.isAdmin], TransactionEbookController.returnEbook);

module.exports = router;
