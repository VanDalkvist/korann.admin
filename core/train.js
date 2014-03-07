/*
 *  Train module
 */

// #region dependents

var express = require('express');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var nject = require('nject');
var map = require('./map');

// #region initialization

function train(dir) {
    catchErrors();

    var tree = new nject.Tree();

    initConstants(tree, {
        app: express(),
        env: {
            root: dir,
            locations: map.locations
        }
    });

    var autoinjectModules = _.where(map, { autoinject: true });

    injectModules(autoinjectModules, dir, tree);

    return tree.resolve();
}

// #region private methods

function initConstants(tree, constants) {
    _.each(constants, function (value, key) {
        tree.constant(key, value);
    });
}

function injectModules(modulesForInjection, dir, tree) {
    _.each(modulesForInjection, function (location) {
        traverseAndRegister(path.join(dir, location.path), tree, location.aggregateOn)
    });
}

function traverseAndRegister(p, tree, aggregateOn) {
    var stat;
    var key = path.basename(p, path.extname(p));

    try {
        stat = fs.statSync(p);
    }
    catch (err) {
        throw new Error('File or directory ' + p + ' could not be found!');
    }

    if (stat.isDirectory()) {
        var files = fs.readdirSync(p);
        files.forEach(function (file) {
            var filePath = path.join(p, file);
            traverseAndRegister(filePath, tree, aggregateOn);
        });
    }
    //ignore hidden files
    else if (key[0] != '.') { // todo: refactor
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
        console.error("Exiting process due to uncaught exception!\n" + err.stack);
        process.exit();
    });
}

// #region exports

module.exports = train;