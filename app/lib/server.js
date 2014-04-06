module.exports = function (app, config) {
    console.log('Express train application listening on %s', config.api.port);
    app.listen(config.api.port);
};