var path = require('path');
var express = require('express');
var routesLogger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');
//var connect_timeout = require('connect-timeout');

module.exports = function (app, config, proxy, storage, controllers, ProxyClient, api, common) {

    app.use(favicon(path.join(app.locals.public, 'favicon.ico')));
    app.use(bodyParser.json());             // req.body & req.files
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(methodOverride());              // '_method' property in body (POST -> DELETE / PUT)
    app.use(cookieParser(config.seance.cookieSecret));      // req.cookies and req.signedCookies
    app.use(express.static(app.locals.public));
    // todo: write cookie parser which set cookie secret as app session token
    app.use(routesLogger('dev'));

    //app.use(connect_timeout({ time: config.api.request_timeout }));     // request timeouts

    var isAuthenticated = controllers.userController.isAuthenticated;

    // Base Routing

    app.get('/', controllers.viewController.index);
    app.get('/login', controllers.viewController.index);
    app.get('/user/session', controllers.userController.getCurrentUser);

    app.post('/user/login', controllers.userController.login);
    app.post('/user/logout', isAuthenticated, controllers.userController.logout);

    app.get('/views/shared/:name', controllers.viewController.view(app.locals.shared));

    app.get('/views/layouts/:name', isAuthenticated, controllers.viewController.view(app.locals.layouts));
    app.get('/views/pages/:name', isAuthenticated, controllers.viewController.view(app.locals.pages));
    app.get('/views/widgets/:name', isAuthenticated, controllers.viewController.view(app.locals.widgets));

    app.all('*', common.request);

    app.use('/api', api);

    app.use(common.errorHandler);

    ProxyClient.init(proxy, config, storage);
};