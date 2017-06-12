var express = require("express");
var config = require("../config");
var userModel = require("../models/userModel");
var utils = require("../lib/utils");
var logger = require("../lib/log").logger("hotelRouter");
var router = express.Router();

router.get('/list', function(req, res, next) {
    return res.render('main/hotel-list');
});

router.get('/detail/:id', function(req, res, next) {
	var id = req.params.id;
    return res.render('main/hotel-detail', {id: id});
});

module.exports = router;

