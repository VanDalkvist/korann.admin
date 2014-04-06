/*
 *  Client of restler proxy
 */

// #region dependents

// #region initialization

var _instance = null;

// #region private methods

function _init(proxy, config, storage) {
    // todo: use storage factory
    var client = new proxy(config.auth.appId, config.auth.appSecret, storage);
    client.authorizeApp();
    _instance = client;
}

// #region exports

exports.init = _init;
exports.Instance = function () {
    return _instance;
};

exports.ModuleName = "ProxyClient";