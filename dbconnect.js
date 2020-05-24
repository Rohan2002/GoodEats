const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'GoodEats',
});
module.exports = pool;
