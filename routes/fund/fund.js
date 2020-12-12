const express = require('express');
const router = express.Router();
// const db_test = require('./db/sql_querys');
const request = require('request');
const req_module = require('../req_nh');
const moment = require('moment');
const fs = require('fs');
const text2png = require('text2png');

var date, hour, kakao_res;

// GET FINACCOUNT
// /users/FA
router.post('/', async function(req, res, next) {

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

      // fs.writeFileSync('public/img/out.png', text2png('잔액\n' + body.Ldbl + "원", {
      //   font: '80px Futura',
      //   color: 'teal',
      //   backgroundColor: 'linen',
      //   lineSpacing: 10,
      //   padding: 20
      // }))

      kakao_res = {
        "version": "2.0",
        "template": {
          "outputs": [{
            "simpleImage": {
              "imageUrl": "https://nh-hackacthon-hjpcq.run.goorm.io/img/out.png"
            }
          }]
        }
      }
      res.status(200).send(kakao_res);
    }

  });
});

module.exports = router;
