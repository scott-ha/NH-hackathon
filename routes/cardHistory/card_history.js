const express = require('express');
const router = express.Router();
// const db_test = require('./db/sql_querys');
const request = require('request');
const req_module = require('../req_nh');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
const fs = require('fs');

var date, hour, kakao_res;
var kakao_res;

router.post('/', function(req, res, next) {
  console.log("card_history in")

  kakao_res = {
    "version": "2.0",
    "template": {
      "outputs": [{
        "simpleText": {
          "text": "카드거래내역 조회를 선택하셨습니다.\n원하시는 기간을 선택해주세요.",
        }

      }],
      "quickReplies": [{
          "action": "block",
          "label": "1주일",
          "blockId": "5fd59318b6158466bd573c77",
          "extra": {
            "search_period": "week"
          }
        },
        {
          "action": "block",
          "label": "1개월",
          "blockId": "5fd59318b6158466bd573c77",
          "extra": {
            "search_period": "month"
          }
        }, {
          "action": "block",
          "label": "3개월",
          "blockId": "5fd59318b6158466bd573c77",
          "extra": {
            "search_period": "threeMonth"
          }
        },
        {
          "action": "block",
          "label": "기간 직접 선택",
          "blockId": "5fd4c3f4a56e832b03f722be"
        }
      ]

    }
  };
  res.status(200).send(kakao_res);
  kakao_res = '';
});


// 카드거래내역 출력
router.post('/week_history', async function(req, res, next) {
  console.log("week_history in")

  function kakaores() {
    return new Promise(function(resolve, reject) {
      console.log("kakaores in")
      var fincardNo = "00829101234560000112345678919";
      console.log('date-----');
      console.log(moment().format("YYYYMMDD"));

      let req_Header = {
        date: moment().format("YYYYMMDD"),
        hour: moment().format("HHmmss")
      };
      request.post(req_module.InquireCreditCardAuthorizationHistory(req_Header), function(error, response, body) {
        if (error) {
          console.error(error);
        } else {
          // console.log("week request in")
          // console.log(response)
          // console.log(body);
          // // data = JSON.parse(body);
          // console.log("조회 총 건수", body.Iqtcnt);
          // console.log("거래내역목록", body.REC);
          // for (var i = 0; i < body.REC.length; i++) {
          //   array[i]
          // }

          console.log(typeof(body));
          var carousel_head = JSON.stringify();

          var listitem, kakao_data;
          body.REC.reverse();
          for (var i = 0; i < body.Iqtcnt / 5; i++) {
            kakao_data = {
              "header": {
                "title": body.Iqtcnt + " 건의 거래내역" + " ( " + ((i * 5) + 1) + " ~ " + ((i * 5) + 5) + " )"
              }
            }


            listitem += JSON.stringify(kakao_data);
            listitem = listitem.slice(0, -1);
            listitem += ',"items":['

            for (var j = (i * 5) + 0; j < (i * 5) + 5; j++) {
              if (j < body.Iqtcnt) {
                kakao_data = {
                  "title": body.REC[j].Usam + "원 " + body.REC[j].AfstNm,
                  "description": moment(body.REC[j].Trdd).format("YYYY-MM-DD") + " " + body.REC[j].Txtm.substring(0, 2) + ":" + body.REC[0].Txtm.substring(2, 4),
                  "imageUrl": "https://nh-hackacthon-hjpcq.run.goorm.io/img/access.png"
                }
                listitem += JSON.stringify(kakao_data) + ",";
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
                    "text": body.Iqtcnt + "건의 카드내역이 검색되었습니다."
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
                "label": "🏠 처음으로",
                "blockId": "5fd4847ae2dafb7751e31240"
              }]
            }
          }
          res.status(200).send(kakao_res);
          kakao_res = {};
        }

      });

    });
  }
  await kakaores();
  kakao_data, kakao_res, listitem = '';
});

router.post('/history', async function(req, res, next) {
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
