/*
 *  Rest client module
 */

// #region dependents

var rest = require('restler');

// #region initialization

function init(config) {
    var authConfig = config.server.appAuth;

    var constructor = function () {
    };

    var options = {
        baseURL: config.server.connection.url + ":" + config.server.connection.port + authConfig.url
    };

    var actions = {
        authorizeApp: function (appId, appSecret) {
            return this.post(authConfig.url, { data: { appId: appId, appSecret: appSecret } });
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