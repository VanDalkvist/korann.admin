var path = require('path');

module.exports = function (app, config) {

    app.set('views', path.join(app.set('root'), 'views'));
    app.set('view engine', 'jade');

    //app.locals({}); // for global access to variables in application
};