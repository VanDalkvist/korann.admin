/*
 *  Auth errors
 */

// #region dependents

var http = require('http');
var util = require('util');

// #region initialization

function init() {
    var AuthError = function (code, message, callback) {
        Error.apply(this, arguments);
        Error.captureStackTrace(this, AuthError);

        this.code = code;
        this.message = message || http.STATUS_CODES[code] || "Error";
    };

    util.inherits(AuthError, Error);

    AuthError.prototype.name = "AuthError";

    return AuthError;
}

// #region exports

module.exports = init;