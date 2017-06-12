var db = require('../lib/db.js');

exports.queryAll = function(callback){
    var sql = 'select * from unit;'
    db.query(sql, [], callback);
};