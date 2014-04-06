var path = require('path');

module.exports = function (app, env) {
    app.set('views', path.join(env.root, env.locations.layouts));
    app.set('view engine', 'jade');

    app.engine('.html', require('jade').__express);

    app.locals({
        public: path.join(env.root, env.locations.public),
        views: path.join(env.root, env.locations.public, env.locations.views)
    });
};