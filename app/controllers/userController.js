module.exports = function (ProxyClient, log) {
    var logger = log.getLogger(module);

    function Client() {
        return ProxyClient.Instance();
    }

    return {
//        get: [
//            function (req, res, next) {
//                if (!req.cookies.session) {
//                    res.send(400);
//                    logger.log("Session does not exist.");
//                }
//
//                return Client().current(req.body);
//            }],
        login: [
            function (req, res, next) {
                var loginInfo = req.body;
                Client().userLogin(loginInfo.login, loginInfo.password, function (err, result) {
                    if (err) return next(err, req, res);

                    logger.log("User '" + loginInfo.login + "' successfully log in.");
                    res.cookie('session', result.token, { maxAge: 900000, httpOnly: true });
                    res.send(200, { username: result.name });
                });
            }],
        logout: [
            function (req, res) {

            }]
    };
};