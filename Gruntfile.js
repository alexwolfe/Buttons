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
  grunt.loadNpmTasks('grunt-includes');

  /**
  * Grunt Configuration
  *
  */
  grunt.initConfig({

    /*
    * Template Includes
    *
    */

    includes: {
      build: {
        cwd: 'showcase/pages',
        src: ['*.html' ],
        dest: 'showcase/',
        options: {
          includePath: 'showcase/includes'
        }
      }
    },


    /*
    * Sass Compilation
    *
    */

    sass: {
      all: {
        files: {
          'tmp/css/buttons.css': 'scss/buttons.scss',
          'tmp/css/showcase.css': 'showcase/scss/showcase.scss'
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
          src: ['**/*', '!showcase.css', '!showcase.css.map'],
          dest: 'css'
        }]
      },
      css_showcase: {
        files: [{
          expand: true,
          cwd: 'tmp/css',
          src: ['**/*', '!buttons.min.css', '!buttons.css.map'],
          dest: 'showcase/css'
        }]
      },
      js_showcase: {
        files: [{
          expand: true,
          cwd: 'js',
          src: ['**/*'],
          dest: 'showcase/js'
        }]
      },
      showcase_dist: {
        files: [{
          expand: true,
          cwd: 'showcase',
          src: ['*.html', 'css/**/*', 'fonts/**/*', 'images/**/*', 'js/**/*'],
          dest: 'showcase-dist'
        }]
      }
    },


    /*
    * Clean tmp folders
    *
    */

    clean: {
      dev: {
        src: ["tmp"]
      },
      build: {
        src: ["showcase-dist"]
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
          base: 'showcase',
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
        files: ['js/**/*.js'],
        tasks: ['copy:main:js_showcase', 'clean:dev']
      },
      sass: {
        files: ['scss/**/*.scss', 'showcase/scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'copy:css_showcase', 'copy:css_library', 'clean:dev']
      },
      includes: {
        files: ['showcase/includes/**/*.html', 'showcase/pages/**/*.html'],
        tasks: ['includes']
      },
      livereload: {
        options: {
          livereload: '<%= connect.livereload.options.livereload %>'
        },
        files: [
          'scss/**/*.scss',
          'css/**/*.css',
          'js/**/*',
          'showcase/**/*'
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
          urls: ['http://localhost:9999/tests/index.html'],
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
  * Grunt Helper Tasks
  *
  */

  grunt.registerTask('test', 'qunit');
  grunt.registerTask('sauceserver', 'connect:sauce');
  grunt.registerTask('sauce', 'saucelabs-qunit');
  var testSubtasks = ['test'];
  if (process.env.SAUCE_ACCESS_KEY !== undefined) {
    testSubtasks.push('sauceserver');
    testSubtasks.push('sauce');
  }
  grunt.registerTask('copyMain', ['copy:css_library', 'copy:css_showcase', 'copy:js_showcase']);


  /**
  * Grunt Core Build Tasks
  *
  */

  grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'copyMain', 'clean:dev']);
  grunt.registerTask('dev', ['includes', 'sass', 'autoprefixer', 'cssmin', 'copyMain', 'clean:dev', 'connect', 'watch']);
  grunt.registerTask('dist', ['clean:build', 'includes', 'sass', 'autoprefixer', 'cssmin', 'copyMain', 'copy:showcase_dist', 'clean:dev']);
  grunt.registerTask('tests', testSubtasks);
};
