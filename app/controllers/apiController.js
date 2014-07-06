var _ = require('lodash');

module.exports = function (ProxyClient, log, scheme) {
    var controller = { };
    var logger = log.getLogger(module);

    function Client() {
        return ProxyClient.Instance();
    }

    // Generic CRUD operations for any model

    controller.model = function (req, res, next, model) {
        if (!model)
            return next(new Error("Model param is required"));

        if (!_.has(scheme, model))
            return next(new Error("Invalid model name"));

        req.model = model;
        logger.debug("API Model parsed: ", model);
        next();
    };

    controller.get = function (req, res, next) {
        Client().read(req.model, req.query, req.signedCookies.session, _getDataRequestCallback(res, next));
    };

    controller.getAll = function (req, res, next) {
        Client().read(req.model, { }, req.signedCookies.session, _getDataRequestCallback(res, next));
    };

    controller.create = function (req, res, next) {
        Client().create(req.model, req.body, req.signedCookies.session, _getDataRequestCallback(res, next));
    };

    controller.update = function (req, res, next) {
        Client().update(req.model, req.body, req.signedCookies.session, _getDataRequestCallback(res, next));
    };

    controller.remove = function (req, res, next) {
        Client().remove(req.model, req.query, req.signedCookies.session, _getDataRequestCallback(res, next));
    };

    // #region private functions

    function _getDataRequestCallback(res, next) {
        return function (err, data) {
            if (err) return next(err);

            return res.json(data);
        };
    }

    return controller;
};