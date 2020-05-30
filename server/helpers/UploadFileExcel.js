const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname + './../public/document/'),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    //cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  console.log("file mimetype", file.mimetype);
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };


const UploadFileExcel = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  // fileFilter: fileFilter,
}).fields([
  { name: 'bab1', maxCount: 1 },
  { name: 'bab2', maxCount: 1 },
  { name: 'bab3', maxCount: 1 },
  { name: 'bab4', maxCount: 1 },
  { name: 'bab5', maxCount: 1 },
  { name: 'abstrack', maxCount: 1 }
]);








module.exports = UploadFileExcel;
