/* eslint-disable consistent-return */

const jwt = require('jsonwebtoken');
const authServices = require('../services/auth-service');

const TokenMiddleWare = function authenticateToken(req, res, next) {
  const token = authServices.showToken();
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(`Token-Check Middleware ${req.user}`);
    next();
  });
};
module.exports = TokenMiddleWare;
