module.exports = (grunt) ->

  # Build target.
  target = grunt.option('target') || 'js'

  # Project configuration.
  config =
    pkg: grunt.file.readJSON 'package.json'
    clean: ['dist']
    concat:
      dist:
        src: [
          'src/moltin.js',
          'src/abstract.js',
          'src/features/products.js',
          'src/services/*.js'
        ],
        dest: 'dist/moltin.' + ( if target != 'js' then target + '.' else '' ) + 'js'
    babel:
      options:
        sourceMap: true,
        presets: ['babel-preset-es2015'],
        plugins: ['babel-plugin-transform-class-properties'],
      dist:
        files:
          'dist/moltin.js': 'dist/moltin.js'
    preprocess:
      inline:
        options:
          context:
            TARGET: target
          inline: true
        src: 'dist/moltin.' + ( if target != 'js' then target + '.' else '' ) + 'js'
    karma:
      unit:
        configFile: 'karma.conf.js'
        options:
          background: false
          files: [
            './src/moltin.js',
            './test/helperFactory.js',
            './test/storageFactory.js',
            './test/requestFactory.js',
            './test/moltin.js'
          ]
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
      files: ['src/*.js', 'src/**/*.js']
      tasks: ['preprocess:inline', 'replace', 'karma', 'uglify', 'compress']

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
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-babel'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-preprocess'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-aws-s3'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  # Tasks.
  grunt.registerTask 'build', ['clean', 'concat', 'babel', 'preprocess:inline', 'karma', 'uglify', 'compress']
  grunt.registerTask 's3', ['copy:aws', 'aws_s3:production']
