var express = require('express');

module.exports = function (scheme, apiController, userController) {

    var router = express.Router();

    router.use('*', userController.isAuthenticated);

    router.param('model', apiController.model);

    router.route('/:model')
        .get(apiController.getAll)
        .post(apiController.create);

    router.route('/:model/:id')
        .get(apiController.get)
        .put(apiController.update)
        .delete(apiController.remove);

    return router;
};