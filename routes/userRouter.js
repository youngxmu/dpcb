var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("userRouter");
var router = express.Router();


router.get('', function(req, res, next) {
	var user = req.session.user;
    return res.render('main/user', user);
});

router.get('/order', function(req, res, next) {
	var cid = req.session.user.cid;
    return res.render('main/order-list', {cid: cid});
});

router.get('/score', function(req, res, next) {
	var cid = req.session.user.cid;
    return res.render('main/score', {cid: cid});
});

router.get('/fav', function(req, res, next) {
	var cid = req.session.user.cid;
    return res.render('main/fav-list', {cid: cid});
});

router.get('/share', function(req, res, next) {
	var cid = req.session.user.cid;
    return res.render('main/share-list', {cid: cid});
});

router.get('/complain', function(req, res, next) {
	var cid = req.session.user.cid;
    return res.render('main/complain', {cid: cid});
});



module.exports = router;

