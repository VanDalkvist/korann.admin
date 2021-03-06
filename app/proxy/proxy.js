/*
 *  Rest client module
 */

// #region dependents

var rest = require('restler');
var _ = require('lodash');

module.exports = function init(config, log, events, scheme, errors) {
    // #region initialization

    var logger = log.getLogger(module);

    var options = {
        baseURL: config.server.url + ":" + config.server.port
    };

    var actions = {
        authorizeApp: _authorizeApp,
        userLogin: _userLogin,
        userLogout: _userLogout,
        isExistSession: _isExistSession,
        create: _create,
        update: _update,
        remove: _remove,
        read: _read,
        readAll: _readAll
    };

    var instance = { };

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
        var context = { data: appAuthInfo };

        sendRequest('post', 'AppAuth', context, successCallback, done);

        function successCallback(data) {
            var storage = instance.defaults.storage;

            storage.saveAppToken(data.token);
            if (data.sessions && data.sessions.length) {
                storage.init(data.sessions, "_id", "context");
            }

            logger.debug("Access token for application '" + instance.defaults.appId + "' was saved in storage.");

            if (done) done(null, data);
        }
    }

    function _userLogin(username, password, done) {
        var context = {
            data: {
                cred: { username: username, password: password }
            },
            headers: {
                appId: instance.defaults.appId,
                token: instance.defaults.storage.getAppToken()
            }
        };

        sendRequest('post', 'UserLogin', context, successCallback, done);

        function successCallback(result) {
            instance.defaults.storage.addSession(result.sessionId, result);

            logger.debug("User login session \n", result, " was saved in storage.");

            if (done) done(null, result);
        }
    }

    function _userLogout(session, done) {
        var context = {
            data: {
                cred: instance.defaults.storage.getSessionSync(session)
            },
            headers: {
                appId: instance.defaults.appId,
                token: instance.defaults.storage.getAppToken()
            }
        };

        sendRequest('post', 'UserLogout', context, successCallback, done);

        function successCallback(result) {
            instance.defaults.storage.removeSession(result.sessionId);
            logger.debug("User login session ", result, " was removed from storage.");

            if (done) done(null, result);
        }
    }

    function _isExistSession(session, done) {
        instance.defaults.storage.getSession(session, function (err, session) {
            if (err) done(err);

            if (!session) {
                return done(new errors.AuthError(401, "Session not found"));
            }

            return done(null, session);
        });
    }

    function _create(modelName, model, sessionId, done) {
        sendAuthenticatedRequest('post', modelName, { data: model }, successCallback, sessionId, done);

        function successCallback(result) {
            logger.debug(modelName, "(id = ", result.id, ") was created.");

            if (done) done(null, result);
        }
    }

    function _update(modelName, id, model, sessionId, done) {
        var context = { data: model };
        sendAuthenticatedRequest('put', modelName, context, successCallback, sessionId, done, id);

        function successCallback(result) {
            logger.debug(modelName, "(id = ", id, ") was updated.");

            if (done) done(null, result);
        }
    }

    function _remove(modelName, id, sessionId, done) {
        sendAuthenticatedRequest('del', modelName, { }, successCallback, sessionId, done, id);

        function successCallback(result) {
            logger.debug(modelName, "was deleted.");

            if (done) done(null, result);
        }
    }

    function _read(modelName, query, sessionId, done) {
        sendAuthenticatedRequest('get', modelName, { query: query }, successCallback, sessionId, done, query.id);

        function successCallback(result) {
            logger.debug("Response received successfully. \n", result);

            if (done) done(null, result);
        }
    }

    function _readAll(modelName, query, sessionId, done) {
        sendAuthenticatedRequest('get', modelName, query, successCallback, sessionId, done);

        function successCallback(result) {
            logger.debug("Response received successfully. \n", result);

            if (done) done(null, result);
        }
    }

    function sendAuthenticatedRequest(method, modelName, context, successCallback, sessionId, done, urlPart) {
        var credentials = instance.defaults.storage.getSessionSync(sessionId);
        var headers = {
            appId: instance.defaults.appId,
            token: instance.defaults.storage.getAppToken(),
            session: credentials.sessionId
        };

        context = _.extend(context, { headers: headers });

        sendRequest(method, modelName, context, successCallback, done, urlPart);
    }

    function sendRequest(method, modelName, context, successCallback, done, urlPart) {
        var eventCallbacks = _getDefaultEventCallbacks(successCallback, done);

        return _sendRequestWithCallbacks(method, modelName, context, eventCallbacks, urlPart);
    }

    function _getDefaultEventCallbacks(successCallback, done) {
        var eventCallbacks = { };
        eventCallbacks[events.Success] = successCallback;
        eventCallbacks[events.Fail] = _getFailCallback(done);

        //eventCallbacks[events.Complete] = _completeCallback; // for debug

        return eventCallbacks;
    }

    function _sendRequestWithCallbacks(method, modelName, context, eventCallbacks, urlPart) {
        var urlPath = scheme[modelName];

        var request = instance[method](urlPath + '/' + (urlPart || ''), context);

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

    function _completeCallback(res) {
        logger.debug(res);
    }
};