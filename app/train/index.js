/*
 *  Train module
 */

// #region dependents

var express = require('express');
var path = require('path');
var _ = require('lodash');
var nject = require('nject');
var map = require('./map');

var moduleFactories = require('./factories');

// #region initialization

function train(dir, resolved) {
    addErrorHandler();

    var tree = new nject.Tree();

    map = _.extend({ modules: {}, locations: {} }, map);

    initConstants(tree, {
        app: express(),
        env: { root: dir, locations: map.locations }
    });

    injectModules(map.modules, dir, tree);

    return tree.resolve(resolved);
}

// #region private methods

function initConstants(tree, constants) {
    _.each(constants, function (value, key) {
        tree.constant(key, value);
    });
}

function injectModules(modulesForInjection, dir, tree) {
    _.each(modulesForInjection, function (location, key) {
        var modulePath = path.join(dir, location.path || key);
        moduleFactories[location.type](modulePath, tree, location.aggregateOn);
    });
}

function addErrorHandler() {
    process.on("uncaughtException", function (err) {
        console.error("Exiting process due to uncaught exception!\n" + err.stack);
        process.exit();
    });
}

// #region exports

module.exports = train;