const express = require('express');
const router = express.Router();
// const db_test = require('./db/sql_querys');
const request = require('request');
const req_module = require('../req_nh');
const moment = require('moment');

var date, hour, kakao_res;

// GET FINACCOUNT
// /users/FA
router.get('/', async function(req, res, next) {

  let req_Header = {
    date: moment().format("YYYYMMDD"),
    hour: moment().format("HHmmss")
  }
  request.post(req_module.get_Account_balance(req_Header), function(error, response, body) {
    if (error) {
      console.error(error);
    } else {
      // data = JSON.parse(body);
      console.log(body.Ldbl);
      console.log(typeof(body));

      kakao_res = {
        "version": "2.0",
        "template": {
          "outputs": [{
            "simpleText": {
              "text": "요청하신 잔액은 " + body.Ldbl + "입니다."
            }
          }]
        }
      }
      res.status(200).send(kakao_res);
    }
  });
});

module.exports = router;
