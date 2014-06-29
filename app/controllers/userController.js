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

                logger.debug("User '" + loginInfo.login + "' successfully log in.");
                _setCookie(res, result);
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

            _setSession(Client, session, res, next);
        },
        getCurrentUser: function (req, res, next) {
            var session = req.signedCookies.session;
            if (!session)
                return res.send(401, {});

            _setSession(Client, session, res, function (err, result) {
                if (err) return res.send(500);

                res.send({ username: result.name });
            });
        }
    };

    // #region private functions

    function _setCookie(res, sessionInfo) {
        res.cookie(cookieName, sessionInfo.sessionId, {
            maxAge: sessionInfo.expired || 0, httpOnly: config.session.httpOnly, signed: true
        });
    }

    function _setSession(Client, session, res, next) {
        Client().isExistSession(session, function (err, result) {
            if (err) return next(err);

            _setCookie(res, result);

            next(null, result);
        });
    }
};