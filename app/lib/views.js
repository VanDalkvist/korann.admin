var path = require('path');

module.exports = function (app, env) {

    app.set('views', path.join(env.root, env.locations.views));
    app.set('view engine', 'jade');

    app.engine('.html', require('jade').__express);

    app.locals({
        views: path.join(env.root, env.locations.views),
        public: path.join(env.root, env.locations.public)
    });
};