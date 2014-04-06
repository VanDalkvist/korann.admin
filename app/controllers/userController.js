module.exports = function (ProxyClient, log) {
    var logger = log.getLogger(module);

    return {
        get: [
            function (req, res, next) {
                // todo: add validation
                if (!req.user) {
                    res.send(400);
                }
            }],
        login: [
            function (req, res, next) {
                var loginInfo = req.body;
                ProxyClient.Instance().userLogin(loginInfo.login, loginInfo.password, function (err, result) {
                    if (err) throw err;

                    logger.log("User '" + loginInfo.login + "' successfully log in.");
                    res.cookie('session', result.token, { maxAge: 900000, httpOnly: true });
                    res.send(200, { username: result.user });
                });
            }],
        logout: [
            function (req, res) {

            }]
    };
};