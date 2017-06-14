var express = require("express");
var config = require("../config");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("sRouter");
var router = express.Router();


router.get('/map', function(req, res, next) {
    return res.render('map');
});

router.get('/about', function(req, res, next) {
    return res.render('about');
});

router.get('/rule', function(req, res, next) {
    return res.render('rule');
});
module.exports = router;

