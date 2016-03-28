module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: {
      name: 'buildDemo',
      version: '<%= pkg.version %>',
      license: '<%= pkg.license %>',
      homepage: '<%= pkg.homepage %>',
      paths: {
        src: 'src',
        build: 'build'
      },
      files: {
        gruntfile: ['gruntfile.js'],
        js: ['**/*.js'],
        css: ['**/*.scss']
      },
      targets: {
        gruntfile: [{
          src: '<%= app.files.gruntfile %>'
        }],
        main: [{
          expand: true,
          cwd: '<%= app.paths.build %>/',
          src: '<%= app.files.js %>',
          css: '<%= app.files.css %>',
          dest: '<%= app.paths.build %>/',
          ext: '.js',
          extDot: 'last'
        }]
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
          files: {
            './build/js/main.js' : './src/js/main.js'
            // expand: true,
            // cwd: '<%= app.paths.src %>',
            // src: '<%= app.files.js %>',
            // ext: '.js',
            // dest: '<%= app.paths.build %>'
        }
      }
    },
    sass: {
      options: {
        sourcemap: 'file'
      },
      dist: {
        files: {
          'build/css/main.css' : 'src/**/*.scss'
        }
      }
    },
    jshint: {
      options: {
        'force': true,
        'esversion': 6,
        'camelcase': true,
        'curly': true,
        'eqeqeq': true,
        'newcap': true,
        'undef': true,
        'unused': true,
        'globals': {
          alert: true,
          document: true
        }
      },
      gruntfile: {
        files: '<%= app.targets.gruntfile %>',
        options: {
          'predef': [
            'module'
          ]
        }
      },
      main: {
        files: '<%= app.targets.main %>',
        options: {
          'predef': [
            'define',
            'require'
          ]
        }
      }
    },
    jscs: {
      options: {
        force: true,
        esnext: true,
        'disallowSpacesInNamedFunctionExpression': {
          'beforeOpeningRoundBrace': true
        },
        'disallowSpacesInFunctionExpression': {
          'beforeOpeningRoundBrace': true
        },
        'disallowSpacesInAnonymousFunctionExpression': {
          'beforeOpeningRoundBrace': true
        },
        'disallowSpacesInFunctionDeclaration': {
          'beforeOpeningRoundBrace': true
        },
        'disallowSpaceBeforeBinaryOperators': [
          ','
        ],
        'requireSpaceBeforeBinaryOperators': true,
        'requireSpaceAfterBinaryOperators': true,
        'requireCamelCaseOrUpperCaseIdentifiers': true,
        'requireCapitalizedConstructors': true,
        'disallowMixedSpacesAndTabs': true,
        'disallowTrailingWhitespace': false,
        'disallowTrailingComma': true,
        'disallowSpaceAfterPrefixUnaryOperators': true,
        'disallowSpaceBeforePostfixUnaryOperators': true,
        'disallowSpacesInsideArrayBrackets': true,
        'disallowSpacesInsideParentheses': false,
        'requireSpaceAfterKeywords': [
          'if',
          'else',
          'for',
          'while',
          'do',
          'switch',
          'case',
          'return',
          'try',
          'catch',
          'typeof'
        ],
        'validateQuoteMarks': true
      },
      gruntfile: {
        files: '<%= app.targets.gruntfile %>'
      },
      main: {
        files: '<%= app.targets.main %>'
      }
    },
    uglify: {
      options: {
        banner: '// <%= app.name %> (version <%= app.version %>) <%= app.homepage %>\n// License: <%= app.license %>\n',
        compress: {
          comparisons: false
        },
        screwIE8: true,
        quoteStyle: 1
      },
      main: {
        files: '<%= app.targets.main %>'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= app.files.gruntfile %>',
        tasks: ['check:gruntfile', 'build']
      },
      main: {
        files: '<%= app.paths.src %>/<%= app.files.js %>',
        tasks: ['build:main']
      }
    }
  });

	grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('check:gruntfile', ['jshint:gruntfile', 'jscs:gruntfile']);
  grunt.registerTask('check:main', ['babel', 'jshint:main']);
  //taking jscs of main to create less dumb errors
  // grunt.registerTask('check:main', ['babel', 'jshint:main', 'jscs:main']); 
  grunt.registerTask('check', ['check:gruntfile', 'check:main']);


  grunt.registerTask('build:main', ['check:main', 'uglify:main', 'sass']);
  grunt.registerTask('build', ['build:main']);

  grunt.registerTask('default', ['check:gruntfile', 'build']);
};