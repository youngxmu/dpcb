var logger = require("./lib/log.js").logger("route");
var config = require("./config");
var wxRouter = require('./routes/wxRouter.js');

var indexRouter = require('./routes/indexRouter.js');
var spotRouter = require('./routes/spotRouter.js');
var orderRouter = require('./routes/orderRouter.js');
var restaurantRouter = require('./routes/restaurantRouter.js');
var infoRouter = require('./routes/infoRouter.js');



module.exports = function (app) {
	app.use('', indexRouter);
	app.use('/r', infoRouter);
    app.use('/spot', spotRouter);
    app.use('/order', orderRouter);
    app.use('/restaurant', restaurantRouter);
    app.get("/", function (req, res, next) {
        res.redirect(redirectPath + "wx/service")
    });
};