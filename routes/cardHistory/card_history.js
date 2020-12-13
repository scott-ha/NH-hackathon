const express = require('express');
const router = express.Router();
// const db_test = require('./db/sql_querys');
const request = require('request');
const req_module = require('../req_nh');
const moment = require('moment');
const fs = require('fs');

var date, hour, kakao_res;
var kakao_res;

router.post('/', async function(req, res, next) {
  function kakaores() {
    return new Promise(function(resolve, reject) {

      kskso_res = response = {
        "version": "2.0",
        "template": {
          "outputs": [{
            "simpleText": {
              "text": "카드거래내역 조회를 선택하셨습니다.",
              "buttons": [{

                  "action": "block",
                  "label": "1주일 거래내역",
                  "blockId": "5fd59318b6158466bd573c77"
                },
                {

                  "action": "block",
                  "label": "1개월 거래내역",
                  "blockId": "5fd59321896ca73e8efa7f96"
                },
                {

                  "action": "block",
                  "label": "기간 직접 선택",
                  "blockId": "5fd5932d896ca73e8efa7f98"
                }


              ]

            }
          }]

        }
      };
      resolve(res.status(200).send(kakao_res));

      // initialize
      kakao_res = '';
    });
  }
});



router.post('/history', async function(req, res, next) {
  req.body
  let req_Header = {
    date: moment().format("YYYYMMDD"),
    hour: moment().format("HHmmss")
  }
  request.post(req_module.requestOpenFinCardDirect(req_Header), function(error, response, body) {
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
          "outputs": []
        }
      }
      res.status(200).send(kakao_res);
    }

  });
});

module.exports = router;
