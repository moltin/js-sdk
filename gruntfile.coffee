module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      compile:
        options:
          bare: true
          sourceMap: true
          sourceMapDir: 'dist/'
        files:
          'dist/moltin.builder.js': ['src/builder.coffee', 'src/builder/loader.coffee', 'src/builder/*.coffee']
          'dist/moltin.js': ['src/moltin.coffee', 'src/features/storage.coffee', 'src/features/*.coffee']
    concat:
      options:
        separator: ';'
        banner: '/*! <%= pkg.name %> minified - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */' + "\n"
      builder:
        src: ['dist/moltin.builder.js', 'src/dot.js']
        dest: 'dist/moltin.builder.js'
      css:
        src: ['src/css/*.css']
        dest: 'dist/moltin.css'
    karma:
      unit:
        options:
          background: true
          files: ['test/*.js']
    uglify:
      postCompile:
        options:
          mangle: true
          sourceMap: true
          sourceMapIncludeSources: true
          drop_console: true
          banner: '/*! <%= pkg.name %> minified - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */' + "\n"
        files:
          'dist/moltin.builder.min.js': ['dist/moltin.js', 'dist/moltin.builder.js']
          'dist/moltin.min.js': 'dist/moltin.js'
    cssmin:
      compress:
        options:
          banner: '/*! <%= pkg.name %> minified - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */' + "\n"
        files:
          'dist/moltin.min.css': ['dist/moltin.css']
    compress:
      main:
        options:
          mode: 'gzip'
        expand: true
        cwd: 'dist/',
        src: ['*.min.js', '*.min.css', '*.min.map']
        dest: 'dist/gzip/'
    watch:
      files: ['src/*.coffee', 'src/features/*.coffee', 'src/builder/*.coffee', 'src/css/*.css']
      tasks: ['coffee', 'concat', 'karma', 'uglify', 'cssmin', 'compress']

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # Default task.
  grunt.registerTask 'default', ['coffee']