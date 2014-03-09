var express = require('express');
var connect_timeout = require('connect-timeout');

// Middleware

module.exports = function (app, config, passportMiddleware, RestClient, storage) {

    // todo: add adequate error handler
    // Error handler
    var error_middleware = express.errorHandler({
        dumpExceptions: true,
        showStack: true
    });

    // Middleware stack for all requests
    app.use(express['static'](app.locals.public));                      // static files in /public
    app.use(connect_timeout({ time: config.api.request_timeout }));     // request timeouts
    app.use(express.favicon());
    app.use(express.cookieParser());                                    // req.cookies
//    app.use(session_middleware);                                        // req.session
    app.use(express.json());
    app.use(express.bodyParser());                                      // req.body & req.files
    app.use(express.methodOverride());                                  // '_method' property in body (POST -> DELETE / PUT)
//    app.use(passportMiddleware.initialize());
//    app.use(passportMiddleware.session());
//    app.use(passportMiddleware.setLocals);
    app.use(app.router);                                                // routes in lib/routes.js

    var authConfig = config.auth.app;

    var client = new RestClient(storage);
    client.authorizeApp(authConfig.appId, authConfig.appSecret);

    // Handle errors thrown from middleware/routes
    app.use(error_middleware);

    app.configure('development', function () {
        require('express-trace')(app);
    });
};