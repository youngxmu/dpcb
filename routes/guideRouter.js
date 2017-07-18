var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("guideRouter");
var router = express.Router();

router.get('/list', function(req, res, next) {
    return res.render('main/guide-list');
});

router.get('/detail/:id', function(req, res, next) {
	var id = req.params.id;
	var user = req.session.user;
    return res.render('main/guide-detail', {id: id, cid: user.cid});
});

module.exports = router;

