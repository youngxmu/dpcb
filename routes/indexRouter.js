var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var rp = require('request-promise');
var logger = require("../lib/log").logger("indexRouter");
var router = express.Router();


// router.get('/login', function(req, res, next) {
//     return res.render('login');
// });

router.get('/login', function(req, res, next) {
	var openid = 'oAz3H05Hvj-Cvc9440usD3k9iqyw';
	var nickname = 'young';
	var avatar = 'http://wx.qlogo.cn/mmopen/1TKMRBgMD6d5fR0wbhe5QGhicQRCowJq7GldgtuPfKPoLN02fUFOPnIoEYPkSzoicAHViaKy4TABKsBvGWiciaBSgqb4Dfeyzbgce/0';
	// req.session.user = {
	// 	cid : openid,
	// 	sname : nickname,
	// 	avatar : avatar
	// }
	// return res.redirect(req.session.path);   
	if(req.session.user){
		if(req.session.path){
			return res.redirect(req.session.path);
		}
		return res.render('login');
	}else{
		var options = {
	        uri: 'http://123.206.194.194:8080/dpcb/r/login?cid='+ openid + '&sname=' + nickname,
	        method: 'POST',
	        body: {
		        cid : openid,
        		sname : nickname
		    },
	        // headers: {
	        //     'User-Agent': 'Request-Promise'
	        // },
	        json: true // Automatically parses the JSON string in the response
	    };
	    rp(options).then(function (repos) {
	    	console.log(repos);
	        if(repos.ret_code == 0){
	        	req.session.user = {
	        		cid : openid,
	        		sname : nickname,
	        		avatar : avatar
	        	}
	     		return res.redirect(req.session.path);   	
	        }
	    }).catch(function (err) {
	    	console.log(err);
	        return res.render('login');
	    });
	}
    
});

router.get('/register', function(req, res, next) {
    return res.render('register');
});

router.get('/forget', function(req, res, next) {
    return res.render('forget');
});

module.exports = router;

