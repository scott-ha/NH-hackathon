const express = require('express');
const router = express.Router();
const db_test = require('../db/sql_querys');
const request = require('request');
const req_module = require('../req_nh');
const moment = require('moment');
const fs = require('fs');
const text2png = require('text2png');

var date, hour, kakao_res, req_Header, req_users, kakao_key, db_result;

// GET FINACCOUNT
// /fund
router.post('/', async function(req, res, next) {

  req_Header = {
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

// 순서
// 카카오키로 계좌 정보 받아오고 받아온 계좌정보로 잔액 조회 **

// /fund/getAccounts

router.post('/getAccounts', async function(req, res, next) {
  kakao_key = req.body.userRequest.user.id;
  db_result = await db_test.get_accounts();

  console.log(db_result);

  req_Header = {
    date: moment().format("YYYYMMDD"),
    hour: moment().format("HHmmss")
  }
  // b5737d511008458fba80a7fb12544a5352ec281fa691fb7800a2a3d2f0b6821396

  req_users = {
    kakao_key: req.body.userRequest.user.id
  }
  console.log(req_users);

  kakao_res = {
    "version": "2.0",
    "template": {
      "outputs": [{
            "simpleText": {
                "text": "간단한 텍스트 요소입니다."
            }
        }]
    }
  }

  res.status(200).send(kakao_res);
});

module.exports = router;
