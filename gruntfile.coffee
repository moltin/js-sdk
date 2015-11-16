module.exports = (grunt) ->

  # Build target.
  target = grunt.option('target') || 'js'

  # Project configuration.
  config =
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      compile:
        options:
          bare: true
          sourceMap: true
          sourceMapDir: 'dist/'
        files: [
          {
            dest: 'dist/moltin.' + ( if target != 'js' then target + '.' else '' ) + 'js'
            src: [
              'src/moltin.coffee',
              'src/' + target + '/ajax.coffee',
              'src/' + target + '/storage.coffee',
              'src/abstract.coffee',
              'src/features/*.coffee'
              'src/' + target + '/export.coffee'
            ]
          }
        ]
    preprocess:
      inline:
        options:
          context:
            TARGET: target
          inline: true
        src: 'dist/moltin.' + ( if target != 'js' then target + '.' else '' ) + 'js'
    replace:
      dist:
        options:
          patterns: [
            {
              match: /[\t]+;\n/g,
              replacement: () ->
                return ''
            }
          ]
        files: [
          {
            expand: true,
            flatten: true,
            src: ['dist/moltin.' + ( if target != 'js' then target + '.' else '' ) + 'js'],
            dest: 'dist/'
          }
        ]
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
          banner: '/*! <%= pkg.name %> (' + target + ') minified - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
        files: [
          {
            dest: 'dist/moltin.' + ( if target != 'js' then target + '.' else '' ) + 'min.js'
            src: 'dist/moltin.' + ( if target != 'js' then target + '.' else '' ) + 'js'
          }
        ]
    compress:
      main:
        options:
          mode: 'gzip'
        expand: true
        cwd: 'dist/',
        src: ['*.min.js', '*.min.css', '*.min.map']
        dest: 'dist/gzip/'
    watch:
      files: ['src/*.coffee', 'src/**/*.coffee']
      tasks: ['coffee', 'preprocess:inline', 'replace', 'karma', 'uglify', 'compress']

  # Do we have credentials?
  if grunt.file.exists('aws-credentials.json')

    # Load aws credentials,
    config.aws = grunt.file.readJSON 'aws-credentials.json'

    # Rename files.
    config.copy =
      aws:
        files: [
          {flatten: true, src: 'dist/gzip/moltin.min.js', dest: 'dist/gzip/v1', filter: 'isFile'}
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
        mime:
          'dist/gzip/v1': 'application/javascript; charset=utf-8',
      production:
        files: [
          {expand: true, cwd: 'dist/gzip/', src: ['**'], dest: '/'}
          {src: 'moltin.min.css', dest: 'v1/', action: 'copy'}
        ]

  # Initialize grunt.
  grunt.initConfig config

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-replace'
  grunt.loadNpmTasks 'grunt-preprocess'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-aws-s3'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  # Tasks.
  grunt.registerTask 'build', ['coffee', 'preprocess:inline', 'replace', 'karma', 'uglify', 'compress']
  grunt.registerTask 's3', ['copy:aws', 'aws_s3:production']
