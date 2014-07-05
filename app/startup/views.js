var path = require('path');
var jade = require('jade');
var util = require('util');
var _ = require('lodash');

module.exports = function (app, env, log) {
    var logger = log.getLogger(module);

    app.set('views', path.join(env.root, env.locations.shared));
    app.set('view engine', 'jade');

    app.engine('.html', jade.__express);

    logger.debug("\nenv.root = '%s';\n", env.root, "env.locations = ", util.inspect(env.locations));

    // todo: simplify
    _.extend(app.locals, {
        public: path.join(env.root, env.locations.public),
        views: path.join(env.root, env.locations.views),
        shared: path.join(env.root, env.locations.shared),
        layouts: path.join(env.root, env.locations.layouts),
        pages: path.join(env.root, env.locations.pages),
        widgets: path.join(env.root, env.locations.widgets)
    });

    logger.debug("app.locals.public = ", app.locals.public);
};