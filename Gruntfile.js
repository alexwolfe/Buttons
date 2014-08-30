module.exports = function (grunt) {
  /**
  * Load Grunt Npm Modules
  *
  */
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /**
  * Grunt Configuration
  *
  */
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'tmp',
          ext: '.css'
        }]
      },
      demo: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'demo/scss',
          src: ['*.scss'],
          dest: 'demo/tmp',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      options: {
          browsers: ['last 3 versions', 'safari 5', 'ie 8', 'ie 9']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'tmp/*.css',
        dest: 'css/'
      }
    },

    clean: {
      build: {
        src: ["tmp/"]
      }
    },

    watch: {
      scripts: {
        files: ['js/**/*.js', 'demo/js/**/*.js'],
        tasks: ['clean']
      },
      sass: {
        files: ['scss/**/*.scss', 'demo/scss/**/*.scss'],
        tasks: ['sass:dist', 'autoprefixer', 'clean']
      }
    }
  });



  /**
  * Grunt Tasks
  *
  */
  grunt.registerTask('default', ['sass:dist', 'autoprefixer', "clean"]);
  grunt.registerTask('dev', ['sass:dist', 'autoprefixer', "clean", 'watch']);
  grunt.registerTask('demo', ['sass:demo', 'autoprefixer', "clean"]);
};
