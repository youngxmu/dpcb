var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("orderRouter");
var router = express.Router();


router.get('/detail/:oid', function(req, res, next) {
	var oid = req.params.oid;
	var cid = req.session.user.cid;
	return res.render('main/order-detail', {cid:cid,oid:oid});
});


// router.get('/confirm/:oid', function(req, res, next) {
// 	var oid = req.params.oid;
// 	var cid = req.session.user.cid;
// 	return res.render('main/order-confirm', {
// 		oid:oid,
// 		cid:cid
// 	});
// });

module.exports = router;

