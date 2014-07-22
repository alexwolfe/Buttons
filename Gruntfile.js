module.exports = function (grunt) {

  grunt.initConfig({

    autoprefixer: {
        options: {
            browsers: ['last 3 versions', 'safari 5', 'ie 8', 'ie 9']
        },
        multiple_files: {
          expand: true,
          flatten: true,
          src: 'tmp/*.css',
          dest: 'css/'
        },

    },


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
      }
    }

  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');

grunt.registerTask('default', ['sass', 'autoprefixer']);


};

