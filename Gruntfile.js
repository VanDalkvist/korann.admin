module.exports = function (grunt) {

    // Load tasks
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');

    var refs = 'app/public/js/references/';
    var content = 'app/public/';
    var app = 'app/public/js/app/';
    var dist = 'app/public/dist/';

    grunt.initConfig({

        copy: {
            angular: {
                expand: true,
                src: refs + 'angular/*.js',
                dest: dist + 'angular/',
                flatten: true
            },
            refs: {
                expand: true,
                src: [
                        refs + 'jquery/dist/jquery.js',
                        refs + 'angular-*/*.js'
                ],
                dest: dist + 'refs/',
                flatten: true
            },
            css: {
                expand: true,
                src: [
                        content + '/css/*.css',
                        refs + 'bootstrap/dist/css/bootstrap.min.css'
                ],
                dest: dist + 'css/',
                flatten: true
            }
        },

        concat: {
            angular: {
                files: [
                    {
                        src: [dist + 'angular/angular.js'],
                        dest: dist + 'angular.js'
                    }
                ]
            },
            refs: {
                files: [
                    {
                        src: [dist + 'refs/**/*.js', '!app/public/dist/refs/**/*.min.js'],
                        dest: dist + 'references.js'
                    }
                ]
            },
            startup: {
                files: [
                    {
                        src: [content + 'js/startup/*.js'],
                        dest: dist + 'startup.js'
                    }
                ]
            },
            app: {
                files: [
                    {
                        src: [app + '/**/*.js' ],
                        dest: dist + 'korann.js'
                    }
                ]
            },
            css: {
                files: [
                    {
                        src: dist + 'css/**/*.css',
                        dest: dist + 'korann.css'
                    }
                ]
            }
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['dev'],
                options: {
                    interrupt: true
                }
            },

            content: {
                files: [content + '**/*', 'app/layouts/*', '!app/public/dist/**/*'],
                tasks: ['build'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        },

        nodemon: {
            dev: {
                script: 'runner.js',
                options: {
                    nodeArgs: ['--debug']
                }
            },
            test: {
                script: 'test.js'
            }
        },

        clean: [dist]
    });

    grunt.registerTask('build', ['clean', 'copy', 'concat']);
    grunt.registerTask('dev', ['build', 'nodemon']);
    grunt.registerTask('test', ['copy', 'nodemon']);
};