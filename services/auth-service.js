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
      const accessToken = generateAccessToken({
        name: user.name,
        email: user.email,
        age: user.age,
        weight: user.weight,
        height: user.height,
      });
      res.json({ accessToken });
    });
  },
  async register(req, res) {
    const {
      name, email, password, age, height, weight,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users(name, email, password, age, weight, height,last_online_date) VALUES ?';
    const Value = [
      [[name, email, hashedPassword, age, weight, height, new Date()]],
    ];
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
    const sql = 'SELECT * FROM USERS WHERE email = ?';
    const param = [[[email]]];
    pool.query(sql, param, (error, result) => {
      if (error) {
        res.sendStatus(500);
      } else {
        const user = result[0];
        bcrypt.compare(password, user.password, (err, check) => {
          if (check == true) {
            const accessToken = generateAccessToken({
              name: user.name,
              email: user.email,
              age: user.age,
              weight: user.weight,
              height: user.height,
            });
            const refreshToken = jwt.sign(email, process.env.SECRET_KEY);
            refreshTokens.push(refreshToken);
            res.json({ accessToken, refreshToken });
            accessMainToken = accessToken;
          } else {
            res.sendStatus(500);
          }
        });
      }
    });
  },
  showToken() {
    return accessMainToken;
  },
};
module.exports = authService;
