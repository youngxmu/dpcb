var logger = require("./lib/log.js").logger("route");
var config = require("./config");
var indexRouter = require('./routes/indexRouter.js');
var ticketRouter = require('./routes/ticketRouter.js');
var spotRouter = require('./routes/spotRouter.js');
var orderRouter = require('./routes/orderRouter.js');
var hotelRouter = require('./routes/hotelRouter.js');
var infoRouter = require('./routes/infoRouter.js');
var userRouter = require('./routes/userRouter.js');
var guideRouter = require('./routes/guideRouter.js');
var goodRouter = require('./routes/goodRouter.js');
var sRouter = require('./routes/sRouter.js');
var signatureRouter = require('./routes/signatureRouter.js');
var wxRouter = require('./routes/wxRouter.js');

module.exports = function (app) {
	app.use('', indexRouter);
    app.use('/signature', signatureRouter);
	app.use('/s', sRouter);
    app.use('/ticket', ticketRouter);
	app.use('/info', infoRouter);
    app.use('/spot', spotRouter);
    app.use('/order', orderRouter);
    app.use('/hotel', hotelRouter);
    app.use('/user', userRouter);
    app.use('/guide', guideRouter);
    app.use('/goods', goodRouter);
    
    app.use('/wx', wxRouter);
    app.get("/", function (req, res, next) {
        res.redirect(redirectPath + "wx/service")
    });
};