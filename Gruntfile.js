module.exports = function (grunt) {

    var config = require('./.grunt.config');

    grunt.initConfig(config.get(grunt));

    grunt.registerTask('build', ['clean', 'copy', 'concat']);
    grunt.registerTask('dev', ['build', 'nodemon']);
    grunt.registerTask('restart', ['nodemon']);
    grunt.registerTask('test', ['copy', 'nodemon']);
};