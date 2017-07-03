var express = require("express");
var config = require("../config");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("ticketRouter");
var router = express.Router();

router.get('/detail', function(req, res, next) {
	var user = req.session.user;
    return res.render('main/ticket-detail', user);
});

router.get('/buy/:tid', function(req, res, next) {
	var tid = req.params.tid;
	var cid = req.session.user.cid;
	return res.render('main/ticket-buy', {
		tid:tid,
		cid:cid
	});
});

module.exports = router;