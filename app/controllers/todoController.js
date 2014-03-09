module.exports = function (app) {
    var controller = {};

    controller.preSearch = [
        function (req, res, next) {
            console.log('this it?');
            req.query = {userId: req.user.id};
            req.Model = Todo;
            next();
        }
    ]
    controller.preCreate = [
        function (req, res, next) {
            req.body.userId = req.user.id;
            req.Model = Todo;
            next();
        }
    ]
    controller.preUpdate = [
        function (req, res, next) {
            Todo.find({_id: req.params.id, userId: req.user.id}, function (err, results) {
                if (err) return next(err);
                if (!results) return res.send(401);
                req.Model = Todo;
                next();
            });
        }
    ]
    controller.preDestroy = [
        function (req, res, next) {
            Todo.find({_id: req.params.id, userId: req.user.id}, function (err, results) {
                if (err) return next(err);
                if (!results) return res.send(401);
                req.Model = Todo;
                next();
            });
        }
    ]

    return controller;
}
