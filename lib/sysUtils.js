var utils = require("../lib/utils.js");
var redisUtils = require("../lib/redisUtils.js");
var unitModel = require('../models/unitModel.js');

var unitList = [];
var unitMap = {};

var getDBUnits = function(callback){
	unitModel.queryAll(function(err, results){
		if(err || results.length == 0){
			console.log('getDBUnits error');
		}else{
			unitList = [];
			unitMap = {};
			for(var index in results){
				var unit = results[index];
				unitList.push(unit);
				unitMap[unit.code] = unit;
			}
			console.log('getDBUnits success');
		}
	});
};

var getUnitName = function(code){
    var name = '';
    if(unitMap[code]){
    	name = unitMap[code].name;
    }
    return name;
};

exports.getDBUnits = getDBUnits;
exports.getUnitName = getUnitName;