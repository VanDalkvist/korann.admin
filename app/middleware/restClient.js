/*
 *  Rest client module
 */

// #region dependents

var rest = require('restler');

// #region initialization

function init(config) {
    var authConfig = config.auth.app;

    var constructor = function () {
    };

    var options = {
        baseURL: config.server.url + ":" + config.server.port + authConfig.url
    };

    var actions = {
        authorizeApp: function (appId, appSecret) {
            return this.post(authConfig.url, { data: { appId: appId, appSecret: appSecret } });
        },
        action: function (method, data) {
            return this[method](authConfig.url, { data: { } });
        },
        getAction: function () {

        },
        postAction: function () {

        },
        deleteAction: function () {

        },
        putAction: function () {

        }
    };
    return rest.service(constructor, options, actions);
}

// #region private methods

// #region exports

module.exports = init;