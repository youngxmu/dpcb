var express = require("express");
var config = require("../config");
var redisUtils = require("../lib/redisUtils");
var rp = require('request-promise');
var logger = require("../lib/log").logger("sysUtils");

var list = [];
var getDBList = function(){
	var options = {
        uri: 'http://123.206.194.194:8080/dpcb/r/infolist',
        method: 'POST',
        body: {},
        json: true // Automatically parses the JSON string in the response
    };
    rp(options).then(function (result) {
        if(result.ret_code == 0){
        	list = [];
            for(var index in result.value){
            	if(index >= 3){
            		break;
            	}
            	var info = result.value[index];
            	list.push(info);
            }
        }else{
        	logger.error(result);	
        }
    }).catch(function (err) {
        logger.error(err);
    });
};

var getList = function(){
	return list;
};

exports.getDBList = getDBList;
exports.getList = getList;