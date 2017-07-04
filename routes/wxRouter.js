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

            var list = sysUtils.getList();

            var result = '<xml>';
            result += '<ToUserName><![CDATA[' + FromUserName + ']]></ToUserName>';
            result += '<FromUserName><![CDATA[' + ToUserName + ']]></FromUserName>';
            result += '<CreateTime>' + new Date().getTime() + '</CreateTime>';
            result += '<MsgType><![CDATA[news]]></MsgType>';
            result += '<ArticleCount>' + list.length + '</ArticleCount>';
            result += getArticals(list);
            result += '</xml>';
            return res.send(result);
        });
    });
});


var getPic = function(picsStr){
    var url = '';
    if(!picsStr){
        return url;
    }

    var pics = picsStr.split(',');
    for(var index in pics){
        var pic = pics[index];
        if(pic && pic != ''){
            url = 'http://123.206.194.194:8080/dpcb' + pic;
            break;
        }
    }
    return url;
};

var getArticals = function(list){
    var articles = '<Articles>';
    for(var key in list){
        var obj = list[key];
        articles += '<item>';
        articles += '<Title><![CDATA[' + obj.title + ']]></Title>';
        articles += '<Description><![CDATA[' + obj.memo + ']]></Description>';
        articles += '<PicUrl><![CDATA[' + getPic(obj.pics) + ']]></PicUrl>';
        articles += '<Url><![CDATA[' + 'http://www.viscloud.cn/dpcb/info/detail/' + obj.iid + ']]></Url>';
        articles += '</item>';    
    }
    articles += '</Articles>';
    return articles;
};

module.exports = router;

