var express = require('express');
var connect_timeout = require('connect-timeout');
var rest = require('restler');

// Middleware

module.exports = function (app, config, passportMiddleware) {

    // Sessions

    // todo: separate api config and server config
//    var session_middleware = express.session({
//        key: config.api.session.key,
//        secret: config.api.session.secret,
//        store: mongoStore
//    });
    // todo: save app session to somewhere

    // Error handler
    var error_middleware = express.errorHandler({
        dumpExceptions: true,
        showStack: true
    });

    // Middleware stack for all requests
    app.use(express['static'](app.set('public')));                      // static files in /public
    app.use(connect_timeout({ time: config.api.request_timeout }));     // request timeouts
    app.use(express.cookieParser());                                    // req.cookies
//    app.use(session_middleware);                                        // req.session
    app.use(express.bodyParser());                                      // req.body & req.files
    app.use(express.methodOverride());                                  // '_method' property in body (POST -> DELETE / PUT)
    app.use(passportMiddleware.initialize());
    app.use(passportMiddleware.session());
    app.use(passportMiddleware.setLocals);
    app.use(app.router);                                                // routes in lib/routes.js

    var authConfig = config.server.appAuth;

    // todo: add CRUD to here

    // todo: move rest service in separate module
    var Core = rest.service(function () {
    }, {
        baseURL: config.server.connection.url + ":" + config.server.connection.port + authConfig.url
    }, {
        authorizeApp: function (appId, appSecret) {
            return this.post(authConfig.url, { data: { appId: appId, appSecret: appSecret } });
        }
    });

    // todo: read login and password from config;
    var client = new Core();
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
