var path = require('path');

module.exports = function (app, env) {

    app.set('views', path.join(env.root, env.locations.views));
    app.set('view engine', 'jade');

    app.locals({
        views: path.join(env.root, env.locations.views),
        public: path.join(env.root, env.locations.public)
    });
};