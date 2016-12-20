module.exports = function(grunt) {
  // Loads each task referenced in the packages.json file
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  // Initiate grunt tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    moment: require('moment'),
    // Tasks
    sass: {
      options: {

      },
      dist: {
        files: {
          'build/course-catalogue.css': 'app/assets/sass/course-catalogue.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      prefix: {
        expand: true,
        src: 'build/*.css'
      }
    },
    cssmin: {
      main: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>, released: <%= moment().format("HH:mm DD-MM-YYYY") %>, license: <%= pkg.license %>  */'
        },
        expand: true,
        cwd: 'build',
        src: ['*.css', '!*.min.css'],
        dest: 'build/',
        ext: '.v<%= pkg.version %>.min.css'
      }
    },
    copy: {
      images: {
        expand: true,
        cwd: 'app/assets/images/',
        src: '**',
        dest: 'build/images/',
        filter: 'isFile'
      },
      video: {
        expand: true,
        cwd: 'app/assets/video/',
        src: '**',
        dest: 'build/video/',
        filter: 'isFile'
      },
      jstemplates: {
        expand: true,
        cwd: 'vendor/frontend/app/templates/',
        src: '**',
        dest: 'build/templates/',
        filter: 'isFile'
      },
      dist: {
        expand: true,
        cwd: 'build/',
        src: '**',
        dest: 'dist',
        filter: 'isFile'
      },
    },
    clean: {
      options: {
        force: true
      },
      dist: ['dist/**/*'],
      deploy: ['deploy/**/*'],
      build: ['build/**/*']
    },
    eslint: {
      options: {
        quiet: true
      },
      target: ['app/assets/js/**/*.js']
    },

    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'build/_<%= pkg.name %>.js': 'app/assets/js/_course-catalogue.js'
        }
      }
    },
    concat: {
      pages: {
        files: {
          'build/studier-index.html': [
            'app/views/partials/_head.html',
            'app/views/partials/_header.html',
            'app/views/pages/content/study-programs.html',
            'app/views/pages/content/study-programs-sidebar-start.html',
            'app/views/pages/content/study-programs-sidebar-search.html',
            'app/views/pages/content/study-programs-sidebar-end.html',
            'app/views/partials/_footer.html'
          ]
        }
      },
      scripts: {
        src: [
          'build/_<%= pkg.name %>.js'
        ],
        dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        //compress: true,
        preserveComments: false,
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>, released: <%= moment().format("HH:mm DD-MM-YYYY") %>, license: <%= pkg.license %>  */'
      },
      main: {
        files: {
          'build/<%= pkg.name %>.v<%= pkg.version %>.min.js': ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js']
        }
      }
    },
    versioning: {
      options: {
        cwd: 'build/',
        outputConfigDir: 'build/',
        namespace: 'hiof'
      },
      build: {
        files: [{
          assets: [{
            src: ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js'],
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
          }],
          key: 'assets',
          dest: '',
          type: 'js',
          ext: '.min.js'
        }, {
          assets: [{
            src: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css',
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css'
          }],
          key: 'assets',
          dest: '',
          type: 'css',
          ext: '.min.css'
        }]
      },
      deploy: {
        options: {
          output: 'php',
          outputConfigDir: 'build/',
        },
        files: [{
          assets: [{
            src: ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js'],
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
          }],
          key: 'assets',
          dest: '',
          type: 'js',
          ext: '.min.js'
        },

        {
          assets: [{
            src: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css',
            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css'
          }],
          key: 'assets',
          dest: '',
          type: 'css',
          ext: '.min.css'
        }
      ]
    }
  },
  secret: grunt.file.readJSON('secret.json'),
  sftp: {
    stage: {
      files: {
        "./": "dist/**"
      },
      options: {
        path: '<%= secret.stage.path %>',
        srcBasePath: "dist/",
        host: '<%= secret.stage.host %>',
        username: '<%= secret.stage.username %>',
        password: '<%= secret.stage.password %>',
        showProgress: true,
        createDirectories: true,
        directoryPermissions: parseInt(755, 8)
      }
    },
    prod: {
      files: {
        "./": "dist/**"
      },
      options: {
        path: '<%= secret.prod.path %>',
        srcBasePath: "dist/",
        host: '<%= secret.prod.host %>',
        username: '<%= secret.prod.username %>',
        password: '<%= secret.prod.password %>',
        showProgress: true,
        createDirectories: true,
        directoryPermissions: parseInt(755, 8)
      }
    }
  },
  express: {
    all: {
      options: {
        port: 9000,
        hostname: "0.0.0.0",
        bases: 'build',
        livereload: true
      }
    }
  },
  open: {
    all: {
      path: 'http://localhost:<%= express.all.options.port%>'
    }
  },
  qunit: {
    all: {
      options: {
        urls: [
          'http://localhost:9000/tests/qunit/study-catalog/study-catalog.html'
        ]
      }
    }
  },
  watch: {
    all: {
      files: ['app/assets/**/*'],
      tasks: ['deploy-staging'],
      options: {

      },
    }
  },
});

grunt.registerTask('subtaskJs', ['eslint','babel',  'concat:scripts', 'uglify']);
grunt.registerTask('subtaskCss', ['sass', 'autoprefixer', 'cssmin']);
grunt.registerTask('subtaskImages', ['copy:images']);
grunt.registerTask('subtaskVideo', ['copy:video']);

grunt.registerTask('build', ['clean:build', 'clean:dist', 'subtaskJs', 'subtaskCss', 'subtaskImages', 'subtaskVideo', 'versioning:build']);
grunt.registerTask('deploy', ['clean:build', 'clean:dist', 'subtaskJs', 'subtaskCss', 'subtaskImages', 'subtaskVideo', 'versioning:deploy', 'copy:dist']);



grunt.registerTask('deploy-staging', ['deploy', 'sftp:stage']);
grunt.registerTask('deploy-prod', ['deploy', 'sftp:prod']);
grunt.registerTask('test', [
  'build',
  'express',
  'qunit'
]);
};
