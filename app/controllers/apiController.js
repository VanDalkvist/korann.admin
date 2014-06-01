module.exports = function (ProxyClient, log) {
    var controller = {};
    var logger = log.getLogger(module);

    function Client() {
        return ProxyClient.Instance();
    }

    /*
     Generic CRUD functions for any model
     */
    controller.get = function (req, res, next) {
        var query = req.query;

        Client().read(req.params.model, query, function (err, data) {
            if (err) return next(err);

            return res.json(data);
        });
    };

    controller.create = function (req, res, next) {
        var model = req.body;

        console.log(model);

        Client().create(req.params.model, model, function (err, data) {
            if (err) return next(err);

            return res.json(data);
        });
    };

    controller.update = function (req, res, next) {
        var model = req.body;

        Client().update(req.params.model, model, function (err, data) {
            if (err) return next(err);

            return res.json(data);
        });
    };

    controller.remove = function (req, res, next) {
        var query = req.query;

        Client().remove(req.params.model, query, function (err, data) {
            if (err) return next(err);

            return res.json(data);
        });
    };

    return controller;
};