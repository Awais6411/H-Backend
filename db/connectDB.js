const mysql = require("mysql2");
const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "Abdulhadi#01",
    database: "bhojan_backend",
  })
  .promise();

module.exports = pool;
