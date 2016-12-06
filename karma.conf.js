/* jshint node: true */

module.exports = function(config) {
  config.set({
    basePath: '',

    files: [
      './dist/moltin.js',
      './tests/**/*.js'
    ],

    exclude: [],

    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    plugins: [
      'karma-jasmine',
      'karma-jasmine-matchers',
      'karma-chrome-launcher'
    ],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true
  });
};
