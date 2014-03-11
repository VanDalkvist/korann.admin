/*
 *  Storage
 */

// #region dependents

// #region initialization

var storage = {
    userSessions: {},
    appSession: {
        token: ""
    }
};

// #region exports

module.exports = {
    addSession: _addSession,
    removeSession: _removeSession,
    getSession: _getSession,
    saveAppToken: _saveAppToken,
    getAppToken: _getAppToken
}

// #region private methods

function _addSession(id, session) {
    storage.userSessions[id] = session;
}

function _removeSession(id) {
    delete storage.userSessions[id];
}

function _getSession(id) {
    if (storage.userSessions[id])
        return storage.userSessions[id];

    throw new Error("Session '" + id + "' doesn't exist.");
}

function _saveAppToken(token) {
    storage.appSession.token = token;
}

function _getAppToken() {
    return storage.appSession.token;
}