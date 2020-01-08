'use strict';

module.exports = function (grunt) {

  grunt.config.set('src', '');
  grunt.config.set('dist', '../');
  grunt.config.set('useRootPath', false);

  grunt.initConfig({

    conf: {
      src: grunt.config.get('src'),
      dist: grunt.config.get('dist')
    },

    pug: {
      html: {
        options: {
          pretty: true,
          spawn: false,
          data: {
            debug: true
          }
        },
        files: [{
          expand: true,
          cwd: '<%= conf.src %>pug',
          src: ['**/*.pug', '!_layouts/**', '!_parts/**', '!_mixins/**'],
          dest: '<%= conf.dist %>',
          ext: '.html'
        }]
      }
    },

    compass: {
      sass: {
        options: {
          spawn: false,
          sourcemap: true,
          noLineComments: true,
          outputStyle: 'expanded',
          sassDir: '<%= conf.src %>sass',
          cssDir: '<%= conf.dist %>css'
        }
      }
    },

    prettier: {
      files: {
        src: ['<%= conf.dist %>js/scripts.js']
      }
    },

    imagemin: {
      images: {
        files: [{
          expand: true,
          cwd: '<%= conf.src %>img',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= conf.dist %>img'
        }]
      }
    },

    copy: {
      js: {
        files: [{
          expand: true,
          cwd: '<%= conf.src %>js',
          src: ['*.js'],
          dest: '<%= conf.dist %>js'
        }]
      },
      svg: {
        files: [{
          expand: true,
          cwd: '<%= conf.src %>img',
          src: ['**/*.svg'],
          dest: '<%= conf.dist %>img'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= conf.src %>sass/fonts',
          src: ['**/*'],
          dest: '<%= conf.dist %>css/fonts'
        }]
      }
    },

    clean: {
      options: {
        force: true
      },
      files: [
        '<%= conf.dist %>**/*.html',
        '<%= conf.dist %>css',
        '<%= conf.dist %>js',
        '<%= conf.dist %>img',
        '!<%= conf.dist %>.git/**',
        '!<%= conf.dist %>dev/**',
        '!<%= conf.dist %>wp/**'
      ]
    },

    browserSync: {
      dev: {
        options: {
          watchTask: true,
          server: grunt.config.get('useRootPath') ? '<%= conf.dist %>' : '<%= conf.dist %>..',
          startPath: grunt.config.get('useRootPath') ? '<%= conf.dist %>' : process.cwd().replace(/\\/g, '/').split('/').reverse()[1],
          files: ['<%= conf.dist %>**/*.{html,css,js}', '!<%= conf.src %>'],
        }
      }
    },

    watch: {
      pug: {
        files: ['<%= conf.src %>pug/**/*.pug'],
        tasks: ['pug-newer']
      },
      pug_common: {
        files: ['<%= conf.src %>pug/_{layouts,parts}/*.pug'],
        tasks: ['pug']
      },
      sass: {
        files: ['<%= conf.src %>sass/**/*.sass'],
        tasks: ['compass']
      },
      js: {
        files: ['<%= conf.src %>js/*.js'],
        tasks: ['copy:js', 'prettier', 'eslint']
      },
      img: {
        files: ['<%= conf.src %>img/**/*.{png,jpg,gif}'],
        tasks: ['imagemin-newer', 'copy:svg']
      },
      svg: {
        files: ['<%= conf.src %>img/**/*.svg'],
        tasks: ['copy:svg']
      }
    },

    validation: {
      options: {
        reset: true,
        stoponerror: false,
        generateReport: false,
        reportpath: false
      },
      files: {
        src: [
          '<%= conf.dist %>**/*.html',
          '!<%= conf.dist %>dev/**',
          '!<%= conf.dist %>wp/**'
        ]
      }
    },

    htmllint: {
      default_options: {
        options: {
          'attr-bans': ['align', 'background', 'bgcolor', 'border', 'frameborder', 'longdesc', 'marginwidth', 'marginheight', 'scrolling', 'style'],
          'attr-name-style': 'dash',
          // 'attr-order': 'class, id, name, data-*, src, for, type, href, value, title, alt, role, aria-*',
          'attr-req-value': false,
          'doctype-first': true,
          'doctype-html5': true,
          'force': true,
          'id-class-no-ad': false,
          'id-class-style': 'dash',
          'indent-style': 'spaces',
          'indent-width': 2,
          'line-end-style': false,
          'tag-bans': ['style'],
        },
        src: [
          '<%= conf.dist %>**/*.html',
          '!<%= conf.dist %>dev/**',
          '!<%= conf.dist %>wp/**'
        ]
      }
    },

    csslint: {
      all: {
        options: {
          'adjoining-classes': false,
          'box-model': false,
          'box-sizing': false,
          'compatible-vendor-prefixes': false,
          'display-property-grouping': false,
          'duplicate-background-images': false,
          'fallback-colors': false,
          'floats': false,
          'font-sizes': false,
          'force': true,
          'gradients': false,
          'ids': false,
          'import': 1,
          'important': false,
          'known-properties': false,
          'order-alphabetical': false,
          'outline-none': false,
          'overqualified-elements': false,
          'qualified-headings': false,
          'selector-newline': false,
          'star-property-hack': false,
          'text-indent': false,
          'unique-headings': false,
          'universal-selector': false,
          'unqualified-attributes': false,
          'vendor-prefix': 2,
          'zero-units': false
        },
        src: ['<%= conf.dist %>css/**/*.css']
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc',
        format: 'stylish',
        failOnError: false,
        fix: true
      },
      target: ['<%= conf.dist %>js/scripts.js']
    },

    fclint: {
      html: {
        options: {
          spelling: true,
          nodoublebr: true
        },
        files: {
          src: [
            '<%= conf.dist %>**/*.html',
            '!<%= conf.dist %>.git/**',
            '!<%= conf.dist %>dev/**',
            '!<%= conf.dist %>wp/**'
          ]
        }
      }
    },

    naming: {
      html: {
        files: {
          src: [
            '<%= conf.dist %>**/*.html',
            '!<%= conf.dist %>.git/**',
            '!<%= conf.dist %>dev/**',
            '!<%= conf.dist %>wp/**'
          ]
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-w3c-html-validation');
  grunt.loadNpmTasks('grunt-prettier');
  grunt.loadNpmTasks('grunt-htmllint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.loadTasks('tasks');

  grunt.registerTask('pug-newer', ['newer:pug']);
  grunt.registerTask('imagemin-newer', ['newer:imagemin']);

  grunt.registerTask('default', [
    'clean',
    'pug',
    'compass',
    'copy:js',
    'prettier',
    'imagemin',
    'copy:svg',
    'copy:fonts',
    'lint',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('quick', [
    'pug',
    'compass',
    'copy:js',
    'prettier',
    'eslint',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('lint', [
    'validation',
    'htmllint',
    'csslint',
    'eslint',
    'fclint'
  ]);

};
