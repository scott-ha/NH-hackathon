const express = require('express');
const router = express.Router();
const db_test = require('../db/sql_querys');
const request = require('request');
const req_module = require('../req_nh');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
const fs = require('fs');
const text2png = require('text2png');
const jsonData = require('./history');

var date, hour, kakao_res, req_Header, req_users, kakao_key, db_result;

// 순서
// 카카오키로 계좌 정보 받아오고 받아온 계좌정보로 잔액 조회 **

// /fund/getAccounts

router.post('/getAccounts', async function(req, res, next) {
  // kakao_key = req.body.userRequest.user.id;
  // db_result = await db_test.get_accounts();

  // console.log(db_result[0].bankName);

  //   [
  //   RowDataPacket {
  //     bankName: '농협은행',
  //     Bncd: '011',
  //     Acno: '16065600',
  //     balance: '',
  //     accountType: '모계좌',
  //     user_no: '1',
  //     FinAcno: '00820100005530000000000005173'
  //   }
  // ]

  req_Header = {
    date: moment().format("YYYYMMDD"),
    hour: moment().format("HHmmss")
  }
  // b5737d511008458fba80a7fb12544a5352ec281fa691fb7800a2a3d2f0b6821396

  // req_users = {
  //   kakao_key: req.body.userRequest.user.id
  // }
  // console.log(req_users);

  kakao_res = {
    "version": "2.0",
    "template": {
      "outputs": [{
        "basicCard": {
          "thumbnail": {
            "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
          },
          "buttons": [{
            "action": "block",
            "blockId": "5fd5b2bff1af467fe1fcba90",
            "label": db_result[0].bankName,
            "extra": {
              "FinAcno": db_result[0].FinAcno
            }
          }]
        }
      }]
    }
  }
  await res.status(200).send(kakao_res);
});

// GET FINACCOUNT
// /fund
router.post('/', async function(req, res, next) {

  req_Header = {
    date: moment().format("YYYYMMDD"),
    hour: moment().format("HHmmss")
  }
  request.post(req_module.CheckOpenFinAccountDirect(req_Header), function(error, response, body) {
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

// 입+출금 선택
// /fund/innout
router.post('/innout', async function(req, res, next) {

  // await fs.readFile('./history.json', 'utf8', (err, jsonFile) => {
  //   jsonData = JSON.parse(jsonFile)
  // })

  function kakaores() {
    return new Promise(function(resolve, reject) {
      console.log("kakaores in")
      var fincardNo = "00829101234560000112345678919";
      console.log('date-----');
      console.log(moment().format("YYYYMMDD"));
      console.log(jsonData[0].price);
      console.log(jsonData.length);

      let req_Header = {
        date: moment().format("YYYYMMDD"),
        hour: moment().format("HHmmss")
      };
      var listitem, kakao_data;
      for (var i = 0; i < jsonData.length / 5; i++) {
        kakao_data = {
          "header": {
            "title": jsonData.length + " 건의 거래내역" + " ( " + ((i * 5) + 1) + " ~ " + ((i * 5) + 5) + " )"
          }
        }


        listitem += JSON.stringify(kakao_data);
        listitem = listitem.slice(0, -1);
        listitem += ',"items":['

        for (var j = (i * 5) + 0; j < (i * 5) + 5; j++) {
          if (j < jsonData.length) {
            var imgurl;
            if (jsonData[j].type == "지출") {
              imgurl = "https://nh-hackacthon-hjpcq.run.goorm.io/img/out.png"
            } else {
              imgurl = "https://nh-hackacthon-hjpcq.run.goorm.io/img/in.png"
            }
            kakao_data = {
              "title": jsonData[j].price + "원 " + jsonData[j].description,
              "description": jsonData[j].date + " " + jsonData[j].time,
              "imageUrl": imgurl
            }
            listitem += JSON.stringify(kakao_data) + ",";
            console.log(j);
          }


        }
        listitem = listitem.slice(0, -1);
        listitem += "]},";
      }

      var bug_index = listitem.search('undefined');
      if (bug_index == 0) {
        listitem = listitem.slice(9, listitem.length - 1);
      } else if (bug_index == -1) {
        listitem = listitem.slice(0, listitem.length - 1);
      }

      listitem = "[" + listitem + "]";
      listitem = JSON.parse(listitem);

      console.log("listitem------");
      console.log(listitem);
      console.log("listitem------");

      kakao_res = {
        "version": "2.0",
        "template": {
          "outputs": [{
              "simpleText": {
                "text": jsonData.length + "건의 카드내역이 검색되었습니다."
              }
            },
            {
              "carousel": {
                "type": "listCard",
                "items": listitem
              }
            }
          ],
          "quickReplies": [{
            "action": "block",
            "label": "🏠 뒤로가기",
            "blockId": "5fd4847ae2dafb7751e31240"
          }, {
            "action": "block",
            "label": "🏠 처음으로",
            "blockId": "5fd4847ae2dafb7751e31240"
          }]
        }
      }
      res.status(200).send(kakao_res);
      kakao_res = {};
    });
  }
  await kakaores();
  kakao_data, kakao_res, listitem = '';
});

// 거래내역
// /fund/history
router.post('/history', async function(req, res, next) {

  // await fs.readFile('./history.json', 'utf8', (err, jsonFile) => {
  //   jsonData = JSON.parse(jsonFile)
  // })

  function kakaores() {
    return new Promise(function(resolve, reject) {
      console.log("kakaores in")
      var fincardNo = "00829101234560000112345678919";
      console.log('date-----');
      console.log(moment().format("YYYYMMDD"));
      console.log(jsonData[0].price);
      console.log(jsonData.length);

      let req_Header = {
        date: moment().format("YYYYMMDD"),
        hour: moment().format("HHmmss")
      };
      var listitem, kakao_data;
      for (var i = 0; i < jsonData.length / 5; i++) {
        kakao_data = {
          "header": {
            "title": jsonData.length + " 건의 거래내역" + " ( " + ((i * 5) + 1) + " ~ " + ((i * 5) + 5) + " )"
          }
        }


        listitem += JSON.stringify(kakao_data);
        listitem = listitem.slice(0, -1);
        listitem += ',"items":['

        for (var j = (i * 5) + 0; j < (i * 5) + 5; j++) {
          if (j < jsonData.length) {
            var imgurl;
            if (jsonData[j].type == "지출") {
              imgurl = "https://nh-hackacthon-hjpcq.run.goorm.io/img/out.png"
            } else {
              imgurl = "https://nh-hackacthon-hjpcq.run.goorm.io/img/in.png"
            }
            kakao_data = {
              "title": jsonData[j].price + "원 " + jsonData[j].description,
              "description": jsonData[j].date + " " + jsonData[j].time,
              "imageUrl": imgurl
            }
            listitem += JSON.stringify(kakao_data) + ",";
            console.log(j);
          }


        }
        listitem = listitem.slice(0, -1);
        listitem += "]},";
      }

      var bug_index = listitem.search('undefined');
      if (bug_index == 0) {
        listitem = listitem.slice(9, listitem.length - 1);
      } else if (bug_index == -1) {
        listitem = listitem.slice(0, listitem.length - 1);
      }

      listitem = "[" + listitem + "]";
      listitem = JSON.parse(listitem);

      console.log("listitem------");
      console.log(listitem);
      console.log("listitem------");

      kakao_res = {
        "version": "2.0",
        "template": {
          "outputs": [{
              "simpleText": {
                "text": jsonData.length + "건의 카드내역이 검색되었습니다."
              }
            },
            {
              "carousel": {
                "type": "listCard",
                "items": listitem
              }
            }
          ],
          "quickReplies": [{
            "action": "block",
            "label": "🏠 뒤로가기",
            "blockId": "5fd4847ae2dafb7751e31240"
          }, {
            "action": "block",
            "label": "🏠 처음으로",
            "blockId": "5fd4847ae2dafb7751e31240"
          }]
        }
      }
      res.status(200).send(kakao_res);
      kakao_res = {};
    });
  }
  await kakaores();
  kakao_data, kakao_res, listitem = '';
});

module.exports = router;
