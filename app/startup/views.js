var path = require('path');
var jade = require('jade');
var util = require('util');

module.exports = function (app, env, log) {

    var logger = log.getLogger(module);

    app.set('views', path.join(env.root, env.locations.shared));
    app.set('view engine', 'jade');

    app.engine('.html', jade.__express);

    logger.debug("env.root = '%s'; env.locations = '%j'", env.root, util.inspect(env.locations));

    app.locals({
        public: path.join(env.root, env.locations.public),
        views: path.join(env.root, env.locations.views),
        shared: path.join(env.root, env.locations.shared)
    });

    logger.debug("app.locals.public = '%j'", util.inspect(app.locals.public));
};