var _ = require('lodash');

module.exports = function (ProxyClient, log, scheme) {
    var controller = { };
    var logger = log.getLogger(module);

    function Client() {
        return ProxyClient.Instance();
    }

    // todo: jsonp???

    /*
     Generic CRUD operations for any model
     */

    controller.model = function (req, res, next, model) {
        if (!model)
            return next(new Error("Model param is required"));

        if (!_.has(scheme, model))
            return next(new Error("Invalid model name"));

        req.model = model;
        next();
    };

    controller.get = function (req, res) {
        var query = req.query;

        Client().read(req.model, query, req.signedCookies.session, function (err, data) {
            // todo: remove 'next'
            if (err) return next(err);

            return res.json(data);
        });
    };

    controller.getAll = function (req, res) {
        Client().read(req.model, {}, req.signedCookies.session, function (err, data) {
            // todo: remove 'next'
            if (err) return next(err);

            return res.json(data);
        });
    };

    controller.create = function (req, res) {
        var model = req.body;

        Client().create(req.model, model, req.signedCookies.session, function (err, data) {
            // todo: remove 'next'
            if (err) return next(err);

            return res.json(data);
        });
    };

    controller.update = function (req, res) {
        var model = req.body;

        Client().update(req.model, model, req.signedCookies.session, function (err, data) {
            // todo: remove 'next'
            if (err) return next(err);

            return res.json(data);
        });
    };

    controller.remove = function (req, res) {
        var query = req.query;

        Client().remove(req.model, query, req.signedCookies.session, function (err, data) {
            // todo: remove 'next'
            if (err) return next(err);

            return res.json(data);
        });
    };

    return controller;
};