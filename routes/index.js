/* eslint-disable consistent-return */
const express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const jwt = require('jsonwebtoken');

const router = express.Router();
const foodController = require('../controllers/food.controller');
const authController = require('../controllers/auth.controller');
const authServices = require('../services/auth-service');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const filename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

function authenticateToken(req, res, next) {
  const token = authServices.showToken();
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(req.user);
    next();
  });
}
const upload = multer({ storage, limits: { fileSize: 5000000 } });
// Food Routes
router.post(
  '/uploadFile',
  upload.single('selectedFile'),
  foodController.API_CALL_UPLOAD,
);
router.post('/uploadCamera', authenticateToken, foodController.API_CALL_CAMERA);
router.post('/foodSelect', authenticateToken, foodController.FOOD_API);

// Auth Routes
router.post('/token', authController.TOKEN);
router.post('/login', authController.LOGIN);
router.post('/register', authController.REGISTER);
router.delete('/logout', authController.LOGOUT);
router.get('/checktoken', authenticateToken, authController.CHECKTOKEN);
module.exports = router;
