var express = require("express");
var config = require("../config");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("ticketRouter");
var router = express.Router();

var dataMap = {
	1 : {
		iid 		: 1,
		title 	: '东坡赤壁门票',
		pageview   : 1,
		start : '2017/05/08',
		end : '2017/05/08',
		pics : 'img/order/pics/dpsx.jpg',
		content :'测试咨询内容',
		kind : 1
	},
	2 : {
		iid 		: 2,
		title 	: '周边活动',
		pageview   : 1,
		start : '2017/05/08',
		end : '2017/05/08',
		pics : 'img/order/pics/dpsx.jpg',
		content :'测试咨询内容',
		kind : 1
	},
	3 : {
		iid 		: 3,
		title 	: 'shangjia活动',
		pageview   : 1,
		start : '2017/05/08',
		end : '2017/05/08',
		pics : 'img/order/pics/dpsx.jpg',
		content :'测试咨询内容',
		kind : 3
	},
};


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

router.get('/detail/:id', function(req, res, next) {
	var id = req.params.id;
	return res.render('main/info-detail', {id:id});
});

module.exports = router;