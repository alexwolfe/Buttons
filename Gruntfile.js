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
        browsers: ['last 3 versions', 'safari 5', 'ie 8', 'ie 9']
      },
      all: {
        expand: true,
        flatten: true,
        src: 'tmp/css/*.css',
        dest: 'tmp/css'
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
      }
    },

    /*
    * Watch for changes
    *
    */
    watch: {
      scripts: {
        files: ['js/**/*.js', 'styleguide/js/**/*.js'],
        tasks: ['clean']
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
    }
  });


  /**
  * Grunt Tasks
  *
  */
  grunt.registerTask('default', ['sass', 'autoprefixer', 'copy', 'clean']);
  grunt.registerTask('dev', ['sass', 'autoprefixer', 'copy', 'clean', 'connect', 'watch']);
};
