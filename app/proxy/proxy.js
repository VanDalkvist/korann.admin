/*
 *  Rest client module
 */

// #region dependents

var rest = require('restler');
var _ = require('underscore');

function init(config, log, events, scheme) {

    // #region initialization

    var logger = log.getLogger(module);

    var options = {
        baseURL: config.server.url + ":" + config.server.port
    };

    var actions = {
        authorizeApp: _authorizeApp,
        current: _currentSession,
        userLogin: _userLogin,
        userLogout: _userLogout,
        create: _create,
        update: _update,
        remove: _remove,
        read: _read
    };

    var instance = {};

    return rest.service(_constructor, options, actions);

    // #region private methods

    /*
     *  Calls when proxy client instance have create.
     */
    function _constructor(appId, appSecret, storage) {
        this.defaults.appId = appId;
        this.defaults.appSecret = appSecret;
        this.defaults.storage = storage;

        instance = this;
    }

    function _authorizeApp(done) {
        var appAuthInfo = { appId: this.defaults.appId, appSecret: this.defaults.appSecret };
        var options = { data: appAuthInfo };

        sendRequest('post', 'AppAuth', options, successCallback, done);

        function successCallback(data) {
            instance.defaults.storage.saveAppToken(data.token);
            logger.debug("Access token for application {" + instance.defaults.appId + "} was saved in storage.");

            if (done) done(null, data);
        }
    }

    function _userLogin(username, password, done) {
        // todo: set appId and token to headers

        var options = { data: {
            appId: instance.defaults.appId,
            token: instance.defaults.storage.getAppToken(),
            cred: { username: username, password: password }
        }};

        sendRequest('post', 'UserLogin', options, successCallback, done);

        function successCallback(result) {
            instance.defaults.storage.addSession(result.name, result);
            logger.debug("User login session ", result, " was saved in storage.");
            if (done) done(null, result);
        }
    }

    function _currentSession(username, token, done) {

    }

    function _userLogout(session, done) {
        var options = { data: {
            appId: instance.defaults.appId,
            token: instance.defaults.storage.getAppToken()
        }};

        sendRequest('post', 'UserLogout', options, successCallback, done);

        function successCallback(result) {
            instance.defaults.storage.removeSession(result.name);
            logger.debug("User login session ", result, " was saved in storage.");
            if (done) done(null, result);
        }
    }

    function _create(modelName, model, done) {
        sendRequest('post', modelName, { data: model }, successCallback, done);

        function successCallback(result) {
            logger.debug(modelName, "(id = ", result.id, ") was created.");

            if (done) done(null, result);
        }
    }

    function _update(modelName, model, done) {
        sendRequest('put', modelName, { data: model }, successCallback, done); // todo: create constants file

        function successCallback(result) {
            logger.debug(modelName, "(id = ", model.id, ") was updated.");

            if (done) done(null, result);
        }
    }

    function _remove(modelName, query, done) {
        sendRequest('del', modelName, { query: query }, successCallback, done);

        function successCallback(result) {
            logger.debug(modelName, "was deleted.");

            if (done) done(null, result);
        }
    }

    function _read(modelName, query, done) {
        sendRequest('get', modelName, { query: query }, successCallback, done);

        function successCallback(result) {
            logger.debug("Response received successfully. Data is ", result);

            if (done) done(null, result);
        }
    }

    function sendRequest(method, modelName, options, successCallback, done) {
        var eventCallbacks = _getDefaultEventCallbacks(successCallback, done);

        return _sendRequestWithCallbacks(method, modelName, options, eventCallbacks);
    }

    function _getDefaultEventCallbacks(successCallback, done) {
        var eventCallbacks = { };
        eventCallbacks[events.Success] = successCallback;
        eventCallbacks[events.Fail] = _getFailCallback(done);
        return eventCallbacks;
    }

    function _sendRequestWithCallbacks(method, modelName, options, eventCallbacks) {
        var urlPath = scheme[modelName];

        var request = instance[method](urlPath, options);

        _setCallbacksForRequest(request, eventCallbacks);

        return request;
    }

    function _setCallbacksForRequest(request, eventCallbacks) {
        _.each(eventCallbacks, function (callback, event) {
            request.on(event, callback);
        });
    }

    function _getFailCallback(callback) {
        return function failCallback(res) {
            logger.error(res.error);

            if (callback) callback(res.error);
        }
    }
}

// #region exports

module.exports = init;