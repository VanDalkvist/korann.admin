module.exports = function (grunt) {
    var config = require('./.grunt.config');

    grunt.initConfig(config.get(grunt));

    grunt.registerTask('build', ['tags']);
    grunt.registerTask('spy', ['build', 'watch:content']);
    grunt.registerTask('dev', ['build', 'nodemon']);
    grunt.registerTask('restart', ['nodemon']);
    grunt.registerTask('test', ['copy', 'nodemon']);
};