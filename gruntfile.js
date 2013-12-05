module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['public/js/**', 'public/app/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['public/app/views/**','public/**'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/content/**','public/assets/css/**'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: ['gruntfile.js', 'public/js/**', 'public/app/**/*.js', 'public/assets/js/*.js']
        },
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './public/lib',
                    layout: 'byComponent',
                    install: true,
                    verbose: true,
                    cleanBowerDir: true
                }
            }
        }
    });

    //Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-bower-task');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Bower task.
    grunt.registerTask('install', ['bower']);
};