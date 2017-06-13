var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("userRouter");
var router = express.Router();


router.get('', function(req, res, next) {
    return res.render('user');
});

router.get('/share', function(req, res, next) {
    return res.render('share');
});

router.get('/score', function(req, res, next) {
    return res.render('score');
});

module.exports = router;

