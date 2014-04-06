var express = require('express');
var trace = require('express-trace');
var connect_timeout = require('connect-timeout');
var path = require('path');

// Middleware

module.exports = function (app, config, proxy, storage, userController, ProxyClient) {

    // todo: add adequate error handler

    // Middleware stack for all requests

    app.use(express.static(app.locals.public));
    app.use(connect_timeout({ time: config.api.request_timeout }));     // request timeouts
    app.use(express.favicon());
    app.use(express.json());
    app.use(express.cookieParser());                                    // req.cookies
    app.use(express.bodyParser());                                      // req.body & req.files
    app.use(express.methodOverride());                                  // '_method' property in body (POST -> DELETE / PUT)
    app.use(app.router);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    app.configure('development', function () {
        trace(app);
    });

    app.get('/', _renderIndex);
    app.get('/partials/:name', _renderView);

    //User
    app.get('/user', userController.get);
    app.post('/user/login', userController.login);
    app.post('/user/logout', _ensureAuthenticated, userController.logout);

    // redirect all others to the index (HTML5 history)
    app.get('*', _renderIndex);

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

    ProxyClient.init(proxy, config, storage);

    // #region private functions

    function _ensureAuthenticated(req, res, next) {
        if (!req.cookies.session) res.send(401);

        return next(req, res);
    }

    // #region private functions

    function _renderIndex(req, res) {
        res.render('index');
    }

    function _renderView(req, res) {
        var name = req.params.name;
        res.render(path.join(app.locals.views, name));
    }

    // Handle errors thrown from middleware/routes
};