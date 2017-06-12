var db = require('../lib/db.js');

var insertSql = 'insert into user(openid, nickname, u_code, create_time) values(?,?,?,?);';
exports.insert = function (openid, nickname, u_code, callback) {
    db.query(insertSql, [openid, nickname, u_code, new Date()], callback);
};


var updateSql = 'update user set u_code = ? where id = ?;';
exports.update = function (id, u_code, callback) {
    db.query(insertSql, [u_code, id], callback);
};


exports.queryUserByOpenid = function(openid, callback){
    var sql = 'select * from user where openid= ?;'
    db.query(sql, [openid], callback);
};



exports.queryAll = function(callback){
    var sql = 'select openid,u_code,count(*) as count from user group by openid,u_code;'
    db.query(sql, [], callback);
};