var path = require('path');

module.exports = function (log) {
    var logger = log.getLogger(module);

    return {
        index: function (req, res) {
            res.render('index');
        },
        view: function (type) {
            return function (req, res) {
                var name = req.params.name;
                res.render(path.join(type, name));
            };
        }
    };
};