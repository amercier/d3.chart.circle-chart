module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    meta: {
      pkg: grunt.file.readJSON('package.json'),
      srcFiles: [
        'src/circle-chart.js'
      ]
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['jshint']
      }
    },
    jshint: {
      options: {
        curly: true,
        undef: true
      },
      chart: {
        options: {
          browser: true,
          globals: {
            d3: true
          }
        },
        files: {
          src: '<%= meta.srcFiles %>'
        }
      },
      grunt: {
        options: {
          node: true
        },
        files: {
          src: ['Gruntfile.js']
        }
      }
    },
    concat: {
      options: {
        banner: '/*! <%= meta.pkg.name %> - v<%= meta.pkg.version %>\n' +
          ' *  License: <%= meta.pkg.license %>\n' +
          ' *  Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          ' */\n'
      },
      dist: {
        files: {
          'dist/d3.chart.circle-chart.js': '<%= meta.srcFiles %>'
        }
      },
      release: {
        files: {
          'd3.chart.circle-chart.js': '<%= meta.srcFiles %>'
        }
      }
    },
    uglify: {
      options: {
        // Preserve banner
        preserveComments: 'some'
      },
      dist: {
        files: {
          'dist/d3.chart.circle-chart.min.js': 'dist/d3.chart.circle-chart.js'
        }
      },
      release: {
        files: {
          'd3.chart.circle-chart.min.js': 'dist/d3.chart.circle-chart.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'concat:dist', 'uglify:dist']);
  grunt.registerTask('release', ['jshint', 'concat', 'uglify']);
};
