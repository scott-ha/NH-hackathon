var express = require('express');
var router = express.Router();
var db_test = require('./db/sql_querys');

/* GET home page. */
router.get('/', async function(req, res, next) {

    let db_result = await db_test.is_users();
    await res.status(200).send(db_result);


});

module.exports = router;
