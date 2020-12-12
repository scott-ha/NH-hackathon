const express = require('express');
const router = express.Router();
const db_test = require('./db/sql_querys');
const request = require('request');
const req_module = require('./req_nh');

// users
router.get('/', async function(req, res, next) {

    let db_result = await db_test.is_users();
    await res.status(200).send(db_result);

});

// GET FINACCOUNT
// /users/FA
router.get('/FA', async function(req, res, next) {

    let result = await request.post(req_module.get_FINAccount());
    await res.status(200).send(result);
});

module.exports = router;
