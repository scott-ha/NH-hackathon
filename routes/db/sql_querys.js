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

exports.get_accounts = function get_accounts() {
  return new Promise(function(resolve, reject) {
    let sql = "SELECT a.* from tb_accounts as a" +
      "inner join tb_users as b on b.user_no = a.user_no" +
      "where b.kakao_key = 'b5737d511008458fba80a7fb12544a5352ec281fa691fb7800a2a3d2f0b6821396'"

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
