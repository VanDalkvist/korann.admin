/*
 *  Train module
 */

// #region dependents

var express = require('express');
var path = require('path');
var _ = require('underscore');
var nject = require('nject');
var map = require('./map');

var moduleFactories = require('./factories');

// #region initialization

function train(dir) {
    addErrorHandler();

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
        moduleFactories[location.type](path.join(dir, location.path), tree, location.aggregateOn);
    });
}

function addErrorHandler() {
    // todo: add restart application when error was catch;
    process.on("uncaughtException", function (err) {
        console.error("Exiting process due to uncaught exception!\n" + err.stack);
        process.exit();
    });
}

// #region exports

module.exports = train;