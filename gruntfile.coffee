module.exports = (grunt) ->

  # Project configuration.
  config =
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

  # Do we have credentials?
  if grunt.file.exists('aws-credentials.json')

    # Load aws credentials,
    config.aws = grunt.file.readJSON 'aws-credentials.json'

    # Rename files.
    config.copy =
      aws:
        files: [
          {flatten: true, src: 'dist/gzip/moltin.min.js', dest: 'dist/gzip/v1', filter: 'isFile'}
          {flatten: true, src: 'dist/gzip/moltin.builder.min.js', dest: 'dist/gzip/builder', filter: 'isFile'}
        ]

    # Upload files to s3.
    config.aws_s3 =
      options:
        accessKeyId: '<%= aws.access %>'
        secretAccessKey: '<%= aws.secret %>'
        region: '<%= aws.region %>'
        bucket: '<%= aws.bucket %>'
        uploadConcurrency: 5
        downloadConcurrency: 5
        params:
          ContentEncoding: 'gzip'
      production:
        files: [
          {expand: true, cwd: 'dist/gzip/', src: ['**'], dest: '/'}
          {src: 'builder', dest: 'v1/', action: 'copy'}
          {src: 'moltin.builder.min.js', dest: 'v1/', action: 'copy'}
          {src: 'moltin.builder.min.map', dest: 'v1/', action: 'copy'}
          {src: 'moltin.min.css', dest: 'v1/', action: 'copy'}
          {dest: '/', exclude: 'builder', flipExclude: true, action: 'delete'}
        ]

  # Initialize grunt.
  grunt.initConfig config

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-aws-s3'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  # Default task.
  grunt.registerTask 's3', ['copy:aws', 'aws_s3:production']
