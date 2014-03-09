/*
 *  Rest client module
 */

// #region dependents

var rest = require('restler');
var _ = require('underscore');

var EVENTS = {
    Complete: "complete",
    Success: "success",
    Fail: "fail",
    Error: "error",
    Abort: "abort",
    Timeout: "timeout"
}

// #region initialization

function init(config, log) {
    var logger = log.getLogger(module);

    var constructor = function (appId, appSecret, storage) {
        this.defaults.appId = appId;
        this.defaults.appSecret = appSecret;
        this.defaults.storage = storage;
    };

    var appAuth = config.auth.app;
    var userAuth = config.auth.user;

    var options = {
        baseURL: config.server.url + ":" + config.server.port
    };

    var actions = {
        authorizeApp: function (done) {
            var self = this;
            var appAuthInfo = { appId: this.defaults.appId, appSecret: this.defaults.appSecret };

            this.post(appAuth.url, { data: appAuthInfo })
                .on(EVENTS.Success, successCallback)
                .on(EVENTS.Fail, errorHandler);

            function successCallback(data) {
                self.defaults.storage.saveAppToken(data.token);
                logger.debug("Access token for application {" + self.defaults.appId + "} was saved in storage.");

                if (done) done(null, data);
            }

            function errorHandler(err) {
                logger.error(err);

                if (done) done(err);
            }
        },
        userLogin: function (username, password, done) {
            var self = this;

            var appAuthInfo = {
                appId: this.defaults.appId,
                token: this.defaults.storage.getAppToken()
            };
            var credentials = { username: username, password: password };

            this.post(userAuth.loginUrl, { data: _.extend(appAuthInfo, { cred: credentials })})
                .on(EVENTS.Success, successCallback)
                .on(EVENTS.Fail, errorHandler);

            function successCallback(result, response) {
                self.defaults.storage.addSession(result.name, result);
                logger.debug("User login session ", result, " was saved in storage.");

                if (done) done(null, result);
            }

            function errorHandler(err) {
                logger.error(err);

                if (done) done(err);
            }
        }
    };
    return rest.service(constructor, options, actions);
}

// #region private methods

// #region exports

module.exports = init;