var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var wxUtils = require("../lib/wxUtils");
var rp = require('request-promise');
var logger = require("../lib/log").logger("indexRouter");
var router = express.Router();

var murl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6c194f81cd892341&redirect_uri=http%3a%2f%2fwww.viscloud.cn%2fdpcb%2flogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';


var login = function (req, res, callback) {
    var code = req.query.code;
    if(req.session && req.session.user){
        user = req.session.user;
        return callback(null, user);
    }else{
        wxUtils.getUserInfoByCode(config.wxapptype, code, function(err, userInfo){
            if(err){
                logger.error('getUserInfoByCode', code, err);
                return callback(err);
            }
            var cid = userInfo.openid;
            var sname = userInfo.nickname;
            var avatar = userInfo.headimgurl;
            var options = {
		        uri: 'http://123.206.194.194:8080/dpcb/r/login',
		        method: 'POST',
		        body: {
			        cid : cid,
	        		sname : sname
			    },
		        json: true // Automatically parses the JSON string in the response
		    };
		    rp(options).then(function (repos) {
		    	console.log('login');
		        if(repos.ret_code == 0){
		        	req.session.user = {
		        		cid : cid,
		        		sname : sname,
		        		avatar : avatar
		        	}
		        	user = req.session.user;
		     		return callback(null, user);	
		        }
		    }).catch(function (err) {
		        return callback(err);
		    });
        });
    }
};


// router.get('/login', function(req, res, next) {
// 	if(req.session.user){
// 		if(req.session.path){
// 			return res.redirect(req.session.path);
// 		}
// 		return res.redirect(config.redirectPath + 'user');
// 	}else{
// 		login(req, res, function(err, user){
// 	        if(err || !user ){
// 	            return res.redirect(murl);
// 	        }
// 	        return res.redirect(req.session.path);
// 	    });
// 	}
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
	    	console.log('login');
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

