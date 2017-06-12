var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("countRouter");
var router = express.Router();

var nameArr = ['区委办','人大办','政府办','政协办','区纪委（监察局）','区委组织部','区委统战部','区委政法委','机关工委','区委党校','人力资源局','区编办','区民政局','区总工会','团区委','区妇联','区残联','区科协','区工商联','区档案局','区信访局','区委党史办','区老干局','保障中心','政务中心（行政审批局）','区法院','区检察院','公安分局','交通大队','区司法局','区建设局','区城管委','区房管局','区水务局','区环保局','区民防办','区统筹办','区园林局','硚房集团','区科技局','食药监局','区安监局','区发改委','区经信局','区招商局','区财政局','区国税局','区地税局','区审计局','工商（质监）局','区统计局','社保处','区教育局','区文体局','区卫计委','长丰街','易家街','古田街','韩家墩街','宗关街','汉水桥街','宝丰街','荣华街','汉中街','六角亭街','汉正街','开发区'];



router.get('/index', function (req, res, next) {
    var map = {};
for(var i=0;i<=66;i++){
    var code = i + 101;
    var data = {
        count : 0,
        code : code,
        name : nameArr[i]
    }
    map[code] = data;
};
    userModel.queryAll(function(err, results){
        if(err){
            return res.render('error',{msg:'查询失败'});
        }
        for(var index in results){
            var user = results[index];
            if(map[user.u_code]){
                map[user.u_code].count = parseInt(map[user.u_code].count) + 1;
                if(user.u_code == 101){
                    console.log(map[user.u_code]);
                }
            }
        }
        return res.render('count',{map:map});
    }); 
});

module.exports = router;