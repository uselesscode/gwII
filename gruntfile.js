/*global module:false*/
module.exports = function (grunt) {
  "use strict";

  var concatName = '<%= pkg.name %>-<%= pkg.version %>',
    concatenatedPath = 'dist/' + concatName  + '.js',
    minifiedPath = 'dist/' + concatName + '.min.js';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      cleanBuild: ['dist'],
      postBuild: {
        // Don't need the non-minified copy or .map for it
        src: [
          concatenatedPath,
          concatenatedPath + '.map'
        ]
      }
    },
    concat_sourcemap: {
      options: {
      },
      main: {
        src: ['dist/<%= pkg.name %>_src/intro.js',
              'dist/<%= pkg.name %>_src/dacache.js',
              'dist/<%= pkg.name %>_src/utility.js',
              'dist/<%= pkg.name %>_src/events.js',
              'dist/<%= pkg.name %>_src/items.js',
              'dist/<%= pkg.name %>_src/recipes.js',
              'dist/<%= pkg.name %>_src/wvw.js',
              'dist/<%= pkg.name %>_src/map.js',
              'dist/<%= pkg.name %>_src/render.js',
              'dist/<%= pkg.name %>_src/misc.js',
              'dist/<%= pkg.name %>_src/export.js',
              'dist/<%= pkg.name %>_src/outro.js'
             ],
        dest: concatenatedPath
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      main: {
        options: {
          sourceMapIn: concatenatedPath + '.map',
          sourceMap: minifiedPath + '.map'
        },
        src: concatenatedPath,
        dest: minifiedPath
      }
    },
    'regex-replace': {
      // concat_sourcemap doesn't seem to supports banners, so banner is in intro.js,
      // search/replace vars
      banner: {
        src: 'dist/<%= pkg.name %>_src/intro.js',
        actions: [
          {
            search: '%pkg.name%',
            replace: '<%= pkg.name %>',
            flags: 'g'
          },
          {
            search: '%pkg.version%',
            replace: '<%= pkg.version %>',
            flags: 'g'
          },
          {
            search: '%build_date%',
            replace: '<%= grunt.template.today("yyyy-mm-dd") %>',
            flags: 'g'
          },
          {
            search: '%copyright_date%',
            replace: '<%= grunt.template.today("yyyy") %>',
            flags: 'g'
          },
          {
            search: '%author%',
            replace: '<%= pkg.author.name %>',
            flags: 'g'
          },
          {
            search: '%licenses%',
            replace: '<%= _.pluck(pkg.licenses, "type").join(", ") %>',
            flags: 'g'
          },
          {
            search: '%homepage%',
            replace: '<%= pkg.homepage %>',
            flags: 'g'
          }
        ]
      },
      postMin: {
        src: [minifiedPath, 'dist/*.map'],
        actions: [
          {
            search: 'dist/',
            replace: '',
            flags: 'g'
          },
          { // right now Chrome seems to only support the old //@ syntax
            search: '//# sourceMappingURL=',
            replace: '//@ sourceMappingURL=',
            flags: 'g'
          }
        ]
      },
      test: {
        src: ['dist/test/tests.html'],
        actions: [
          {
            search: '<script src="internal.js"></script>',
            replace: ''
          },
          {
            search: /<!--src-->[^!]*<!--\/src-->/,
            replace: '<script src="../' + concatName + '.min.js"></script>',
          }
        ]
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: ['*.js'],
        dest: 'dist/<%= pkg.name %>_src/',
        filter: 'isFile'
      },
      test: {
        expand: true,
        cwd: 'test/',
        src: ['common.js', 'external.js', 'mocks.js', 'lib/*', 'mocks/*.json', 'tests.html'],
        dest: 'dist/test/',
        filter: 'isFile'
      }
    },
    qunit: {
      preBuild: ['test/**/*.html'],
      postBuild: ['dist/test/**/*.html'],
    },
    compress: {
      options: {
        mode: 'gzip'
      },
      main: {
        files: [
          {
            src: minifiedPath,
            dest: minifiedPath + '.gz'
          },
          {
            src: minifiedPath + '.map',
            dest: minifiedPath + '.map.gz'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-regex-replace');

  grunt.registerTask('default', ['clean:cleanBuild', 'qunit:preBuild', 'copy', 'regex-replace:banner', 'concat_sourcemap', 'uglify', 'regex-replace:postMin', 'compress', 'copy:test', 'regex-replace:test', 'clean:postBuild', 'qunit:postBuild']);
  grunt.registerTask('test', ['qunit:preBuild']);
  grunt.registerTask('notest', ['clean:cleanBuild', 'copy', 'regex-replace:banner', 'concat_sourcemap', 'uglify', 'regex-replace:postMin', 'compress', 'copy:test', 'regex-replace:test', 'clean:postBuild']);
};
