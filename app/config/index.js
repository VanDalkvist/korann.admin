var path = require('path');
var nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json') });

// #region private functions

var settings = {
    api: nconf.get('api'),
    server: nconf.get('server')
};

// #region exports

module.exports = settings;