var express = require('express');
var connect_timeout = require('connect-timeout');

// Middleware

module.exports = function (app, config, proxy, storage) {

    // todo: add adequate error handler

    // Middleware stack for all requests
    app.use(connect_timeout({ time: config.api.request_timeout }));     // request timeouts
    app.use(express.favicon());
    app.use(express.cookieParser());                                    // req.cookies
    app.use(express.json());
    app.use(express.bodyParser());                                      // req.body & req.files
    app.use(express.methodOverride());                                  // '_method' property in body (POST -> DELETE / PUT)

    var authConfig = config.auth;

    // todo: add client factory usage there.
    var client = new proxy(authConfig.appId, authConfig.appSecret, storage);
    client.authorizeApp();

    app.locals.client = client;

    // Handle errors thrown from middleware/routes
//    app.use(express.errorHandler({
//        dumpExceptions: true,
//        showStack: true
//    }));

    app.configure('development', function () {
        require('express-trace')(app);
    });
};