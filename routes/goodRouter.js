var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("goodRouter");
var router = express.Router();

router.get('/list', function(req, res, next) {
	var user = req.session.user;
    return res.render('main/good-list', user);
});

router.get('/detail/:id', function(req, res, next) {
	var user = req.session.user;
	var id = req.params.id;
    return res.render('main/good-detail', {id:id,cid:user.cid});
});

module.exports = router;

