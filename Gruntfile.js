module.exports = function (grunt) {

    var gruntConfiguration = require('./.grunt.config');

    grunt.initConfig(gruntConfiguration.get(grunt));

    grunt.registerTask('build', ['newer:clean', 'newer:copy', 'newer:concat']);
    grunt.registerTask('dev', ['build', 'nodemon']);
    grunt.registerTask('test', ['copy', 'nodemon']);
};