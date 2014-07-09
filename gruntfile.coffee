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
          sourceMapName: 'dist/moltin.min.js.map'
          sourceMapIncludeSources: true
          sourceMapIn: 'dist/moltin.js.map'
          drop_console: true
          banner: '/*! <%= pkg.name %> minified - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
        files:
          'dist/moltin.builder.min.js': 'dist/moltin.builder.js'
          'dist/moltin.min.js': 'dist/moltin.js'
    watch:
      files: ['src/*.coffee', 'src/features/*.coffee', 'src/builder/*.coffee']
      tasks: ['coffee', 'karma', 'uglify']

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # Default task.
  grunt.registerTask 'default', ['coffee']