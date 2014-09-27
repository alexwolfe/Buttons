module.exports = function (grunt) {
  /**
  * Load Grunt Npm Modules
  *
  */
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  /**
  * Grunt Configuration
  *
  */
  grunt.initConfig({

    /*
    * Sass Compilation
    *
    */
    sass: {
      all: {
        files: {
          'tmp/css/buttons.css': 'scss/buttons.scss',
          'tmp/css/styleguide.css': 'styleguide/scss/styleguide.scss'
        }
      }
    },

    /*
    * Vendor Prefixing
    *
    */
    autoprefixer: {
      options: {
        browsers: ['last 3 versions', 'safari 5', 'ie 8', 'ie 9', 'Firefox >= 20']
      },
      all: {
        expand: true,
        flatten: true,
        src: 'tmp/css/*.css',
        dest: 'tmp/css'
      }
    },


    /*
    * Minify files
    *
    */
    cssmin: {
      add_banner: {
        options: {
          banner: '/* Buttons */',
          keepSpecialComments: 1
        },
        files: {
          'tmp/css/buttons.min.css': ['tmp/css/buttons.css']
        }
      }
    },


    /*
    * Copy files
    *
    */
    copy: {
      css_library: {
        files: [{
          expand: true,
          cwd: 'tmp/css',
          src: ['**/*', '!styleguide.css', '!styleguide.css.map'],
          dest: 'css'
        }]
      },
      css_styleguide: {
        files: [{
          expand: true,
          cwd: 'tmp/css',
          src: ['**/*'],
          dest: 'styleguide/css'
        }]
      },
      js_styleguide: {
        files: [{
          expand: true,
          cwd: 'js',
          src: ['**/*'],
          dest: 'styleguide/js'
        }]
      }
    },


    /*
    * Clean tmp folders
    *
    */
    clean: {
      build: {
        src: ["tmp"]
      }
    },

    /*
    * Launch local server
    *
    */
    connect: {
      livereload: {
        options: {
          port: 8000,
          livereload: 35729, // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost',
          base: 'styleguide',
          open: true
        }
      },
      sauce: {
        options: {
          port: 9999,
          hostname: 'localhost',
          base: '',
        }
      }
    },

    /*
    * Watch for changes
    *
    */
    watch: {
      scripts: {
        files: ['js/**/*.js', 'styleguide/js/**/*.js'],
        tasks: ['copy:js_styleguide', 'clean']
      },
      sass: {
        files: ['scss/**/*.scss', 'styleguide/scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'copy', 'clean']
      },
      livereload: {
        options: {
          livereload: '<%= connect.livereload.options.livereload %>'
        },
        files: [
          'scss/**/*.scss',
          'css/**/*.css',
          'js/**/*',
          'styleguide/**/*'
        ]
      }
    },

    /*
    * QUnit
    *
    */
    qunit: {
      options: {
        urls:[
          'http://localhost:9999/js/tests/*.html'
        ]
      }
    },

    /*
    * Saucelabs
    * Requires environment variables set e.g. export SAUCE_USERNAME=XX; export SAUCE_ACCESS_KEY=XX
    *
    */
    'saucelabs-qunit': { //DO NOT CHANGE NAME
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 3,
          tunnelTimeout: 5,
          urls: ['http://localhost:9999/js/tests/index.html'],
          testname: 'Buttons Sauce Unit Tests',
          browsers: [
            {
              browserName: 'safari',
              version: '6',
              platform: 'OS X 10.8'
            },
            {
              browserName: 'firefox',
              version: '25',
              platform: 'OS X 10.6'
            },
            {
              browserName: 'chrome',
              version: '31',
              platform: 'Windows 8.1'
            }
          ]
        }
      }
    }

  });


  /**
  * Grunt Tasks
  *
  */

  // Test task.
  grunt.registerTask('test', 'qunit');
  grunt.registerTask('sauceserver', 'connect:sauce');
  grunt.registerTask('sauce', 'saucelabs-qunit');

  var testSubtasks = ['test'];
  if (process.env.SAUCE_ACCESS_KEY !== undefined) {
    testSubtasks.push('sauceserver');
    testSubtasks.push('sauce');
  }

  grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'copy', 'clean']);
  grunt.registerTask('dev', ['sass', 'autoprefixer', 'cssmin', 'copy', 'clean', 'connect', 'watch']);
  grunt.registerTask('tests', testSubtasks);
};
