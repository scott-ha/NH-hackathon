const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./config');
var pool = mysql.createPool(dbConfig);

// tb_users, tb_accounts, tb_cards

// Check
exports.is_users = function is_users() {
  return new Promise(function(resolve, reject) {
    let sql =
    "SELECT * FROM tb_users";
    pool.getConnection(function(err, connection) {
      if (!err) {
        connection.query(sql,
          (err, rows) => {
            if (err) {
              reject(err);
            }
            console.log('db access..');
            console.log(rows);
            resolve(rows); // query results
          })
      }
      // pool release
      connection.release();
    });
  });
}

// insert into nh_smithground.tb_users values('하늘', '19920927', '000553', '55bacf8f744b2e6ff6f01bb2acc0b25a50cf91475dea7c7950e11e02c8a169d4', 'haneul9209@kakao.com', '1');
