/*
 *  Initialization module
 */

// #region dependents

var restClient = require('./restClient');

// #region initialization

function init() {
    restClient.run(function () {
        process.exit(0);
    });
}

// #region private methods

// #region exports

exports.run = init;