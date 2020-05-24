/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const foodController = require('../controllers/food.controller');
const authController = require('../controllers/auth.controller');
const authenticateToken = require('../middleware/token-check');
const upload = require('../middleware/multer-upload');

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
router.delete('/logout', authenticateToken, authController.LOGOUT);
router.get('/checktoken', authenticateToken, authController.CHECKTOKEN);

// User Routes
// router.post('/getUser', authenticateToken, authController.);
module.exports = router;
