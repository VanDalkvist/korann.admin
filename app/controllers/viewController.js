var path = require('path');

module.exports = function (env, log) {
    var logger = log.getLogger(module);

    return {
        index: function (req, res) {
            res.render('layout');
        },
        view: function (type) {
            return function (req, res) {
                var name = req.params.name;
                res.render(path.join(type, name));
            };
        }
    };
};