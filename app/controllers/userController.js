module.exports = function (ProxyClient, log, errors, config) {
    var logger = log.getLogger(module);

    var cookieName = "session";

    function Client() {
        return ProxyClient.Instance();
    }

    return {
        login: function (req, res, next) {
            var loginInfo = req.body;
            Client().userLogin(loginInfo.login, loginInfo.password, function (err, result) {
                if (err) return next(err, req, res);

                logger.log("User '" + loginInfo.login + "' successfully log in.");
                res.cookie(cookieName, result.sessionId, {
                    maxAge: result.expired, httpOnly: config.session.httpOnly, signed: true
                });
                res.send(200, { username: result.name });
            });
        },
        logout: function (req, res, next) {
            var session = req.signedCookies.session;
            Client().userLogout(session, function (err) {
                if (err) return next(err, req, res);

                logger.log("Session '" + session + "' successfully destroyed.");
                res.clearCookie(cookieName);
                res.send(200);
            });
        },
        isAuthenticated: function (req, res, next) {
            var session = req.signedCookies.session;
            if (!session)
                return next(new errors.AuthError(401));

            Client().isExistSession(session, function (err, session) {
                if (err) return next(err);

                next();
            });
        }
    };
};