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

                // load task
                grunt.loadNpmTasks(module.task);
            });

            return config;
        }
    }
}

// #region private functions

function _internalConfig() {

    var clientPath = "public/";

    return {
        client: clientPath,
        js: clientPath + "js/",
        build: "build/",
        jsDest: clientPath + "compiled/js/",
        cssDest: clientPath + "compiled/css/",
        layouts: clientPath + "views/shared/layouts/",
        views: clientPath + "views/",
        bower: "bower_components/"
    };
}

// #region exports

module.exports = init();