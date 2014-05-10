var _ = require('underscore');
var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {

    // initialization
    grunt.initConfig(_initConfig());

    // Load tasks
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['clean', 'copy', 'concat']);
    grunt.registerTask('dev', ['build', 'nodemon']);
    grunt.registerTask('test', ['copy', 'nodemon']);
};

//#region private functions

function _initConfig() {
    var gruntConfigPath = "./grunt/";
    var config = {};

    fs.readdirSync(gruntConfigPath).forEach(function (file) {
        var filePath = gruntConfigPath + file;
        var key = path.basename(filePath, path.extname(filePath));

        config[key] = require(filePath);
    });

    return _.extend({ clean: ["app/public/dist/"] }, config);
}