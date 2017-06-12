var express = require('express');
var userModel = require('../models/userModel.js');
var rp = require('request-promise');
var config = require("../config");
var utils = require("../lib/utils.js");
var sysUtils = require("../lib/sysUtils.js");
var wxUtils = require("../lib/wxUtils.js");
var logger = require("../lib/log.js").logger("authRouter");
var parseString = require('xml2js').parseString;
var router = express.Router();

router.get('/service', function (req, res, next) {//just for weixin valid
    var echostr = req.query.echostr;
    res.send(echostr);
});

router.get('/index', function (req, res, next) {
    res.render('index');
});


router.get('/token', function (req, res, next) {
    wxUtils.getToken(config.wxapptype, function(err, data){
        if(err){
            logger.error(err);
            return res.send(false);
        }
        return res.json(data);
    });
});

router.post('/service', function (req, res, next) {
    req.setEncoding('utf8');
    var userData = {};
    var xml = '';
    req.on('data', function(d) {
        xml += d;//get data from wexin service
    });
    req.on('end', function () {
        parseString(xml, function (err, result) {
            var userData = result.xml;
            var MsgType = userData.MsgType;
            var ToUserName = userData.ToUserName;
            var FromUserName = userData.FromUserName;
            Content = userData.Content;
            //return res.send('success');
            if(!Content || Content == ''){
                return res.send('success');
            }
            if(isNaN(Content)){
                return res.send('success');
            }

            var result = '<xml>';
            result += '<ToUserName><![CDATA[' + FromUserName + ']]></ToUserName>';
            result += '<FromUserName><![CDATA[' + ToUserName + ']]></FromUserName>';
            result += '<CreateTime>' + new Date().getTime() + '</CreateTime>';
            result += '<MsgType><![CDATA[text]]></MsgType>';
            if(Content< 100 || Content > 167){
                result += '<Content><![CDATA[验证码输入错误，请核对后重试]]></Content></xml>';
                return res.send(result);
            }
            
            userModel.insert(FromUserName, '', Content, function(err){
                if(err){
                    result += '<Content><![CDATA[验证码输入错误，请核对后重试]]></Content></xml>';
                    return res.send(result);
                }
                result += '<Content><![CDATA[验证成功，来自' + sysUtils.getUnitName(Content) + ']]></Content></xml>';
                return res.send(result);
            });
        });
    });
});

module.exports = router;

