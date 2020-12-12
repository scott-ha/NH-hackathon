const express = require('express');
const router = express.Router();
const db_test = require('./db/sql_querys');
const request = require('request');
const req_module = require('./req_nh');
const moment = require('moment');

var date,hour;

// users
router.get('/', async function(req, res, next) {

  let db_result = await db_test.is_users();
  await res.status(200).send(db_result);

});

// GET FINACCOUNT
// /users/FA
router.get('/FA', function(req, res, next) {

  let req_Header = {
    date: moment().format("YYYYMMDD"),
    hour: moment().format("HHmmss")
  }
  let result = request.post(req_module.get_FINAccount(req_Header), function(error, response, body) {
    if (error) {
      console.error(error);
    } else {
      // data = JSON.parse(body);
      console.log(body);
      res.status(200).send(body);
    }
  });
});

module.exports = router;
