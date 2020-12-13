const express = require('express');
const router = express.Router();
// const db_test = require('./db/sql_querys');
const request = require('request');
const req_module = require('../req_nh');
const moment = require('moment');
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
          "blockId": "5fd5932d896ca73e8efa7f98"
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
      let req_Header = {
        date: moment().format("YYYYMMDD"),
        hour: moment().format("HHmmss"),
        fincardNo: fincardNo
      };
      request.post(req_module.InquireCreditCardAuthorizationHistory(req_Header), function(error, response, body) {
        if (error) {
          console.error(error);
        } else {
          // console.log("week request in")
          // console.log(response)
          // // data = JSON.parse(body);
          console.log("조회 총 건수", body.Iqtcnt);
          // console.log("거래내역목록", body.REC);
          // for (var i = 0; i < body.REC.length; i++) {
          //   array[i]
          // }
          console.log(body.REC);

          console.log(typeof(body));
          var carousel_head = JSON.stringify();

          var listitem, kakao_data;

          for (var i = 0; i < body.REC.length / 5; i++) {
            kakao_data = {
              "header": {
                "title": body.REC.length + " 건의 거래내역"
              }
            }

            listitem += JSON.stringify(kakao_data) + ',"items":[';

            for (var j = (i * 5) + 0; j < (i * 5) + 5; j++) {

              kakao_data = {
                "title": "(출) " + body.REC[j].Usam + "원 " + body.REC[j].AfstNm,
                "description": moment(body.REC[19].Trdd).format("YYYY-MM-DD") + " " + body.REC[j].Txtm.substring(0, 2) + ":" + body.REC[0].Txtm.substring(2, 4),
                "imageUrl": "http://k.kakaocdn.net/dn/APR96/btqqH7zLanY/kD5mIPX7TdD2NAxgP29cC0/1x1.jpg"
              }
              listitem += JSON.stringify(kakao_data) + ",";

            }
            listitem.slice(0,-1);
            listitem += ",";
          }

          var bug_index = listitem.search('undefined');
          if (bug_index == 0) {
            listitem = listitem.slice(9, listitem.length - 1);
          } else if (bug_index == -1) {
            listitem = listitem.slice(0, listitem.length - 1);
          }

          listitem = listitem
          listitem = JSON.parse(listitem);

          console.log("listitem------");
          console.log(listitem);
          console.log("listitem------");

          kakao_res = {
            "version": "2.0",
            "template": {
              "outputs": [{
                "carousel": {
                  "type": "listCard",
                  "items": [

                    {
                      "header": {
                        "title": body.REC.length + " 건의 거래내역"
                      },
                      "items": [{
                          "title": "(출) " + body.REC[0].Usam + "원 " + body.REC[0].AfstNm,
                          "description": moment(body.REC[19].Trdd).format("YYYY-MM-DD") + " " + body.REC[0].Txtm.substring(0, 2) + ":" + body.REC[0].Txtm.substring(2, 4),
                          "imageUrl": "http://k.kakaocdn.net/dn/APR96/btqqH7zLanY/kD5mIPX7TdD2NAxgP29cC0/1x1.jpg"
                        },
                        {
                          "title": "Kakao i Open Builder",
                          "description": "카카오톡 채널 챗봇 만들기",
                          "imageUrl": "http://k.kakaocdn.net/dn/N4Epz/btqqHCfF5II/a3kMRckYml1NLPEo7nqTmK/1x1.jpg",
                          "link": {
                            "web": "https://namu.wiki/w/%EB%AC%B4%EC%A7%80(%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB%A0%8C%EC%A6%88)"
                          }
                        },
                        {
                          "title": "Kakao i Voice Service",
                          "description": "보이스봇 / KVS 제휴 신청하기",
                          "imageUrl": "http://k.kakaocdn.net/dn/bE8AKO/btqqFHI6vDQ/mWZGNbLIOlTv3oVF1gzXKK/1x1.jpg",
                          "link": {
                            "web": "https://namu.wiki/w/%EC%96%B4%ED%94%BC%EC%B9%98"
                          }
                        }
                      ]
                    }

                  ]
                }
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
