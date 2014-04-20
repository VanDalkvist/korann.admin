/*
 *  Storage
 */

// #region dependents

var _ = require('underscore');

// #region initialization

var storage = {
    userSessions: {},
    appSession: {
        token: ""
    }
};

// #region exports

module.exports = {
    init: _init,
    addSession: _addSession,
    removeSession: _removeSession,
    getSession: _getSession,
    getSessionSync: _getSessionSync,
    saveAppToken: _saveAppToken,
    getAppToken: _getAppToken
};

// #region private methods

function _init(sessions, keyName, sessionObjectName) {
    _.each(sessions, function (session) {
        storage.userSessions[session[keyName]] = session[sessionObjectName];
        storage.userSessions[session[keyName]].sessionId = session[keyName];
    });
}

function _addSession(id, session) {
    storage.userSessions[id] = session;
}

function _removeSession(id) {
    delete storage.userSessions[id];
}

function _getSession(id, done) {
    done = done || function () {
    };

    var userSession = storage.userSessions[id];
    if (userSession)
        return done(null, userSession);

    done(new Error("Session '" + id + "' doesn't exist."));
}

function _getSessionSync(id) {
    return storage.userSessions[id];
}

function _saveAppToken(token) {
    storage.appSession.token = token;
}

function _getAppToken() {
    return storage.appSession.token;
}