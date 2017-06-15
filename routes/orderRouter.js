var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("orderRouter");
var router = express.Router();

var dataMap = {
	1 : {
		id 		: 1,
		name 	: '东坡赤壁门票',
		count   : 1,
		amount  : 38,
		status : 0,
		order_no : '123123123123123',
		create_time : '2017/05/08 12:12:12',
		use_time : '2017/05/08 12:12:12',
		description : '东坡赤壁，又名黄州赤壁',
		spic : 'img/order/pics/dpsx.png',
		pic : 'img/order/pics/dpsx.jpg'
	},
	2 : {
		id 		: 2,
		name 	: '栖霞楼门票',
		count   : 1,
		amount  : 38,
		status : 0,
		order_no : '123123123123123',
		create_time : '2017/05/08 12:12:12',
		use_time : '2017/05/08 12:12:12',
		description : '东坡赤壁，又名黄州赤壁',
		spic : 'img/order/pics/dpsx.png',
		pic : 'img/order/pics/dpsx.jpg'
	},
	3 : {
		id 		: 3,
		name 	: '栖霞楼门票',
		count   : 2,
		amount  : 38,
		status : 1,
		order_no : '123123123123123',
		create_time : '2017/05/08 12:12:12',
		use_time : '2017/05/08 12:12:12',
		description : '东坡赤壁，又名黄州赤壁',
		spic : 'img/order/pics/dpsx.png',
		pic : 'img/order/pics/dpsx.jpg'
	},
};


router.get('/list', function(req, res, next) {
    return res.render('main/order-list');
});

router.post('/list', function(req, res, next) {
	var status = req.body.status;
	if(!status){
		status = 0;
	}
	var results = [];
	for(var key in dataMap){
		var order = dataMap[key]
		console.log(order.status +' ' + status)
		if(order.status == status){
			results.push(dataMap[key]);
		}
	}
    return res.json({
    	success : true,
    	list : results
    });
});

router.get('/detail/:id', function(req, res, next) {
	var id = req.params.id;
	var order = dataMap[id];
	return res.render('main/order-detail', order);
});


router.get('/create/:prodId', function(req, res, next) {
	var prodId = req.params.prodId;
	var prod = {
		id : 1,
		name : '东坡赤壁门票',
		desc : '购票须知：门票门票门票门票门票门票门票门票门票门票门票门票门票门票门票门票门票门票门票门票门票门票门票门票',
		spic : 'img/order/pics/dpsx.png',
		amount  : 38,
		price : 38
	};
	return res.render('main/order-create', prod);
});

module.exports = router;

