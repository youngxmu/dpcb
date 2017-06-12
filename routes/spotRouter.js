var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("spotRouter");
var router = express.Router();

var dataMap = {
	1 : {
		id 		: 1,
		name 	: '东坡塑像',
		description : '东坡赤壁，又名黄州赤壁',
		spic : 'img/spot/pics/dpsx.png',
		pic : 'img/spot/pics/dpsx.jpg'
	},
	2 : {
		id 		: 2,
		name 	: '栖霞楼',
		description : '东坡赤壁，又名黄州赤壁',
		spic : 'img/spot/pics/dpsx.png',
		pic : 'img/spot/pics/dpsx.jpg'
	}
};


router.get('/list', function(req, res, next) {
    return res.render('main/spot-list');
});

router.post('/list', function(req, res, next) {
	var results = [];
	for(var key in dataMap){
		results.push(dataMap[key]);
	}
    return res.json({
    	success : true,
    	list : results
    });
});

router.get('/detail/:id', function(req, res, next) {
	var id = req.params.id;
	var spot = dataMap[id];
    return res.render('main/spot-detail', spot);
});

module.exports = router;

