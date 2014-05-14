module.exports = function (grunt) {

    var config = require('./.grunt.config');

    grunt.initConfig(config.get(grunt));

    grunt.registerTask('build', ['copy', 'concat', 'bowerInstall', 'clean:build']);
    grunt.registerTask('spy', ['build', 'watch']);
    grunt.registerTask('dev', ['build', 'nodemon']);
    grunt.registerTask('restart', ['nodemon']);
    grunt.registerTask('test', ['copy', 'nodemon']);
};