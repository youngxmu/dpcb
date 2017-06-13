var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("orderRouter");
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


router.get('/list', function(req, res, next) {
    return res.render('main/info-list');
});

router.post('/infolist', function(req, res, next) {
	var results = [];
	for(var key in dataMap){
		var info = dataMap[key]
		results.push(info);
	}
    return res.json({
    	success : true,
    	list : results
    });
});

router.get('/detail/:id', function(req, res, next) {
	var id = req.params.id;
	return res.render('main/info-detail', {id:id});
});


router.post('/detail', function(req, res, next) {
	var id = req.body.id;
	var info = dataMap[id];
	return res.json({
		success : true,
		info : info
	});
});

module.exports = router;

