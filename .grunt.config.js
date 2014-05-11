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
            var config = {};

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

// #region exports

module.exports = init();