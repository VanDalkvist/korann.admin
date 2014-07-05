var express = require('express');
var _ = require('lodash');

module.exports = function (scheme, apiController, userController) {

    var router = express.Router();

    var isAuthenticated = userController.isAuthenticated;

    router.use('*', isAuthenticated);

    // Api
    router.param('model', apiController.model);

    router.route('/:model')
        .get(apiController.getAll)
        .put(apiController.create);

    router.route('/:model/:id')
        .get(apiController.get)
        .put(apiController.update)
        .delete(apiController.remove);

    return router;
};