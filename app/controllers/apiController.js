module.exports = function (app) {
    var controller = {};

    var client = app.locals.client;

    /*
     Generic CRUD functions for any model
     */
    controller.get = [
        /*
         route functions get 3 args - the request object, the response object, and next - a callback to move on
         to the next middleware.
         req.query = json object with query string arguments
         req.params = json object with values of routing params such as :model or :id
         req.body = json request body from post / put requests
         */
        function (req, res, next) {
            console.log('starting api.search');
            var query = req.query;

            client.read(req.params.model, query, function (err, data) {
                if (err) return next(err);

                return res.json(data);
            });
        }
    ]
    controller.create = [
        function (req, res, next) {
            var model = req.body;

            console.log(model);

            client.create(req.params.model, model, function (err, data) {
                if (err) return next(err);

                return res.json(data);
            });
        }
    ]
    controller.update = [
        function (req, res, next) {
            var id = req.params.id;
            delete req.body._id; //removing the _id from the model to prevent mongo from thinking we are trying to change its type
            req.Model.findByIdAndUpdate(id, req.body, function (err, doc) {
                if (err) return next(err);
                if (doc === null) return res.send(404);
                return res.json(doc);
            })
        }
    ]
    controller.delete = [
        function (req, res, next) {
            var id = req.params.id;
            req.Model.findByIdAndRemove(id, function (err, doc) {
                if (err) return next(err);
                if (doc === null) return res.send(404);
                return res.send(204);
            })
        }
    ]

    return controller;
}
