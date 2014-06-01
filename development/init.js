/*
 *  Initialization module
 */

// #region dependents

var restClient = require('./restClient');
var fs = require('fs');
var logger = require('../app/log').getLogger(module);
var path = require('path');
var async = require('async');

// #region initialization

function init() {
    var cred = { username: 'admin', password: 'admin' };

    restClient.run(
        cred,
        runTests);
}

// #region private methods

function runTests(err, client, userInfo) {
    if (err) return process.exit(-1);

    var tests = [];

    var testsFolder = path.join(__dirname, "./tests");
    fs.readdirSync(testsFolder).forEach(function (file) {
        var module = require(path.join(testsFolder, file));

        tests.push(module);
    });

    async.waterfall([
        function (callback) {
            var errors = [];

            tests.forEach(function (test) {
                test.run(client, userInfo, function (err) {
                    if (!err) return;

                    logger.log("Test failed: " + err);

                    errors.push(err);
                });
            });

            callback(errors);
        }
    ], function (errors) {
        if (errors.length) {
            logger.log("Some tests was failed");
        }
    });
}

// #region exports

exports.run = init;