var express = require('express');
var trace = require('express-trace');
var connect_timeout = require('connect-timeout');
var path = require('path');

// Middleware stack for all requests

module.exports = function (env, app, config, proxy, storage, controllers, ProxyClient) {

    app.use('/', express.static(app.locals.public));
    app.use(connect_timeout({ time: config.api.request_timeout }));     // request timeouts
    app.use(express.favicon());
    app.use(express.json());
    // todo: write cookie parser which set cookie secret as app session token
    app.use(express.cookieParser(config.seance.cookieSecret));                                    // req.cookies and req.signedCookies
    app.use(express.bodyParser());                                      // req.body & req.files
    app.use(express.methodOverride());                                  // '_method' property in body (POST -> DELETE / PUT)
    app.use(app.router);

    // Errors
    trace(app);
    app.use(_errorHandler);

    app.get('/', controllers.viewController.index);
    app.get('/login', controllers.viewController.index);

    app.post('/user/login', controllers.userController.login);
    app.post('/user/logout', controllers.userController.isAuthenticated, controllers.userController.logout);

    app.get('/views/shared/:name', controllers.viewController.view(app.locals.shared));

    app.get('/views/:name', controllers.userController.isAuthenticated, controllers.viewController.view(app.locals.views));

    //whenever a router parameter :model is matched, this is run
    app.param('model', function (req, res, next, model) {
//        console.log(app);
//        var Model = app.models[model];
//        if (Model === undefined) {
//            //if the request is for a model that does not exist, 404
//            return res.send(404);
//        }
//        req.Model = Model;
//        return next();
    });

    // redirect all others to the index (HTML5 history)
    app.get('*', controllers.userController.isAuthenticated, controllers.viewController.index);

    ProxyClient.init(proxy, config, storage);

    // #region private functions

    function _errorHandler(err, req, res, next) {
        if (err.code === 401)
            res.clearCookie("session");

        res.status(err.code || 500);
        res.send({ error: err });
    }
};