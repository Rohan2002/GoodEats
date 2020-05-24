/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../dbconnect');
require('dotenv').config();

let refreshTokens = [];
let accessMainToken = '';
function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
}
const authService = {
  // eslint-disable-next-line consistent-return
  get_token(req, res) {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
      return res.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      const accessToken = generateAccessToken({ email: user.email });
      res.json({ accessToken });
    });
  },
  async register(req, res) {
    const {
      email, password, age, height, weight,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users(email, password, age, weight, height,last_online_date) VALUES ?';
    const Value = [[[email, hashedPassword, age, weight, height, new Date()]]];
    pool.query(sql, Value, (error, result) => {
      if (error) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  },
  logout(req, res) {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
  },
  async login(req, res) {
    const { email, password } = req.body;
    // const comparision = await bcrypt.compare(password, results[0].password)
    if (email == 'r@g.com' && password == 'r') {
      const accessToken = generateAccessToken({ email });
      const refreshToken = jwt.sign(email, process.env.SECRET_KEY);
      refreshTokens.push(refreshToken);
      res.json({ accessToken, refreshToken });
      accessMainToken = accessToken;
    }
    return 'error';
  },
  showToken() {
    return accessMainToken;
  },
};
module.exports = authService;
