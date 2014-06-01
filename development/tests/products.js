/*
 *  
 */

// #region dependents

var logger = require('../../app/log').getLogger(module);

// #region initialization

function run(client, userInfo, callback) {
    client.read("product", "name=Product5", userInfo.sessionId, function (err) {
        if (err) {
            logger.log("Products test failed.");

            return callback(err);
        }

        logger.log("Products test passed.");

        callback(null);
    });
}

// #region private methods

// #region exports

module.exports.run = run;