/*
 *  Rest client test
 */

// #region dependents

var config = require('./config');
var log = require('../app/log');
var events = require('../app/proxy/events');
var scheme = require('../app/proxy/scheme');
var proxy = require('../app/proxy/proxy');
var proxyClient = proxy(config, log, events, scheme);
var storage = require('../app/proxy/storage');
var logger = log.getLogger(module);
var async = require('async');

// #region initialization

function init(cred, done) {
    var appAuthConfig = config.auth;

    var client = new proxyClient(appAuthConfig.appId, appAuthConfig.appSecret, storage);

    async.waterfall([
        function (callback) {
            client.authorizeApp(function (err, data) {
                if (err) {
                    logger.error("Test failed. Error is: \n", err, " \n");
                    callback(err);
                }
                logger.debug("Test passed. Response is: \n", data, " \n");
                callback(null);
            });
        },
        function (callback) {
            client.userLogin(cred.username, cred.password, function (err, data) {
                if (err) {
                    logger.error("Test failed. Error is: \n", err, " \n");
                    callback(err);
                }
                logger.info("Test passed. Response is: \n", data, " \n");
                callback(null, client, data);
            });
        }
    ], function (err, client, session) {
        done(err, client, session);
    });
}

// #region exports

exports.run = init;