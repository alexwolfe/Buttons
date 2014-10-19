module.exports = function(grunt) {
	grunt.initConfig({
		svgstore: {
			options: {
				//fill with currentColor will get preserved (otherwise fills removed)
				cleanup: ['fill', 'stroke'],
				includedemo: true,
				formatting: {
					indent_size: 2
				}
			},
			default: {
				files: {
          '.tmp/svg-defs.svg': ['svgs/*.svg']
        }
			}
		},
		svgmin: {
			options: {
				plugins: [
          { cleanupIDs: false },
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false }]
			},
			dist: {
				files: {
          'dist/svg-defs.svg': '.tmp/svg-defs.svg'
        }
			}
		},
    svg2png: {
      all: {
        files: [{
          cwd: 'svgs/', src: ['*.svg'], dest: 'pngs'
        }
        ]
      }
    },
    copy: {
      main: {
        nonull: true,
        src: 'dist/svg-defs.svg',
        dest: '../styleguide/images/svgs/svg-defs.svg'
      }
    },
		clean: {
			dist: {
        src: ['dest', '.tmp']
			}
		}
	});
	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('cleanup', ['clean:dist']);
  grunt.registerTask('default', ['clean:dist', 'svgstore', 'svgmin:dist', 'copy:main', 'svg2png']);
};
