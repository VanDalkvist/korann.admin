/*
 *  Rest client test
 */

// #region dependents

var config = require('./config');
var log = require('../app/log');
var RestClient = require('../app/middleware/RestClient')(config, log);
var storage = require('../app/middleware/storage');
var logger = log.getLogger(module);

// #region initialization

function init(done) {
    var appAuthConfig = config.auth.app;

    var client = new RestClient(appAuthConfig.appId, appAuthConfig.appSecret, storage);

    (function (next) {
        client.authorizeApp(function (err, data) {
            if (err) {
                logger.error("Test failed. Error is ", err);
                if (next) next();
                return;
            }
            logger.info("Test passed. Response is ", data);
            if (next) next();
        });
    })(function () {
        authUser(done);
    });

    function authUser(next) {
        var username = 'admin';
        var password = 'admin';

        client.userLogin(username, password, function (err, data) {
            if (err) {
                logger.error("Test failed. Error is ", err);
                if (next) next();
                return;
            }
            logger.info("Test passed. Response is ", data);
            if (next) next();
        });
    }
}

// #region private methods


// #region exports

exports.run = init;