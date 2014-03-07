var express = require('express');
var connect_timeout = require('connect-timeout');

// Middleware

module.exports = function (app, config, passportMiddleware, RestClient) {

    // Sessions

    // todo: separate api config and server config
    var memoryStore = new express.session.MemoryStore();

    var session_middleware = express.session({
        key: config.api.session.key,
        secret: config.api.session.secret,
        store: memoryStore
    });
    // todo: save app session to somewhere

    // Error handler
    var error_middleware = express.errorHandler({
        dumpExceptions: true,
        showStack: true
    });

    // Middleware stack for all requests
    app.use(express['static'](app.locals.public));                      // static files in /public
    app.use(connect_timeout({ time: config.api.request_timeout }));     // request timeouts
    app.use(express.cookieParser());                                    // req.cookies
    app.use(session_middleware);                                        // req.session
    app.use(express.bodyParser());                                      // req.body & req.files
    app.use(express.methodOverride());                                  // '_method' property in body (POST -> DELETE / PUT)
    app.use(passportMiddleware.initialize());
    app.use(passportMiddleware.session());
    app.use(passportMiddleware.setLocals);
    app.use(app.router);                                                // routes in lib/routes.js

    var authConfig = config.server.appAuth;

    // todo: read login and password from config;

    var client = new RestClient();
    client.authorizeApp(authConfig.appId, authConfig.appSecret).on('complete', function (data) {
        // todo: save session info;
        console.log(data);
    });

    // Handle errors thrown from middleware/routes
    app.use(error_middleware);

    app.configure('development', function () {
        require('express-trace')(app);
    });
};