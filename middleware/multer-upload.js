const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const filename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});
const upload = multer({ storage, limits: { fileSize: 5000000 } });

module.exports = upload;
