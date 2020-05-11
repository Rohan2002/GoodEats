const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const controller  = require('../controllers/controller');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const filename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, filename);
  }
});


const upload = multer({ storage: storage, limits: { fileSize: 5000000 } });
router.post("/uploadFile", upload.single("selectedFile"), controller.API_CALL_UPLOAD);


router.post("/uploadCamera", controller.API_CALL_CAMERA);
router.post("/foodSelect", controller.FOOD_API);

module.exports = router;
