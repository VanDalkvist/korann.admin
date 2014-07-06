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

    _.extend(app.locals, _.mapValues(env.locations, function (location) {
        return path.join(env.root, location);
    }));

    logger.debug("app.locals.public = ", app.locals.public);
};