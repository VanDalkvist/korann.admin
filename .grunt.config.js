/*
 *  Grunt config initialization
 */

// #region dependents

var _ = require('underscore');
var fs = require('fs');
var path = require('path');

// #region initialization

function init() {
    var gruntConfigPath = "./grunt/";

    return {
        get: function (grunt) {
            var config = {
                meta: _internalConfig()
            };

            fs.readdirSync(gruntConfigPath).forEach(function (file) {
                var filePath = gruntConfigPath + file;

                var module = require(filePath);

                config[module.name] = module.config;

                // loading task
                grunt.loadNpmTasks(module.task);
            });

            return config;
        }
    }
}

// #region private functions

function _internalConfig() {

    var dependencies = require('wiredep')({
        directory: "public/vendors"
    });

    var clientPath = "public/";

    return {
        dependencies: {
            js: dependencies.js,
            css: dependencies.css
        },
        client: clientPath,
        js: clientPath + "js/",
        build: "build/",
        jsDest: clientPath + "compiled/js/",
        cssDest: clientPath + "compiled/css/",
        shared: clientPath + "views/shared/",
        views: clientPath + "views/"
    };
}

// #region exports

module.exports = init();