module.exports = function (controllers) {

    function _request(req, res, next) {
        if (req.originalUrl.indexOf('/api') > -1) {
            return next();
        }

        controllers.viewController.index(req, res);
    }

    function _errorHandler(err, req, res, next) {
        if (err.code === 401) {
            return res.redirect("/login");
        }

        res.status(err.code || 500);
        res.send({ error: err });
    }

    return {
        errorHandler: _errorHandler,
        request: _request
    };
};