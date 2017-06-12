var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("indexRouter");
var router = express.Router();


router.get('/login', function(req, res, next) {
    return res.render('login');
});

router.get('/register', function(req, res, next) {
    return res.render('register');
});

router.get('/forget', function(req, res, next) {
    return res.render('forget');
});

module.exports = router;

