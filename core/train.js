/*
 *  Train module
 */

// #region dependents

var express = require('express');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var nject = require('nject');
var locations = require('./locations');

// #region initialization

function train(dir) {
    catchErrors();

    var app = express();

    app.set('root', dir);
    app.set('views', path.join(dir, locations.views.path));
    app.set('public', path.join(dir, locations.public.path));

    //var config = loadConfig(path.join(dir, locations.config.path));

    var tree = new nject.Tree();
    //tree.constant('config', config);

    _.each(_.where(locations, { autoinject: true }), function (location) {
        traverseAndRegister(path.join(dir, location.path), tree, location.aggregateOn)
    });

    //allow override of app
    if (!tree.isRegistered('app')) {
        tree.constant('app', app);
    }

    return tree.resolve();
}

// #region private methods

function traverseAndRegister(p, tree, aggregateOn) {
    var stat,
        key = path.basename(p, path.extname(p));

    try {
        stat = fs.statSync(p);
    }
    catch (err) {
        throw new Error('File or directory ' + p + ' could not be found. This is necessary for your application to conform to the express train framework!');
    }

    if (stat.isDirectory()) {
        var files = fs.readdirSync(p);
        files.forEach(function (file) {
            var filePath = path.join(p, file);
            traverseAndRegister(filePath, tree, aggregateOn);
        });
    }
    //ignore hidden files
    else if (key[0] != '.') {
        var loaded = require(p);
        if (_.isFunction(loaded)) {
            tree.register(key, loaded, {
                identifier: p,
                aggregateOn: aggregateOn
            });
        }
        else {
            tree.constant(key, loaded, {
                identifier: p,
                aggregateOn: aggregateOn
            });
        }
    }
}

function catchErrors() {
    process.on("uncaughtException", function (err) {
        console.error("Exiting process due to uncaught exception! " + err);
        console.error(err.stack || err);
        process.exit();
    });
}

// #region exports

module.exports = train;