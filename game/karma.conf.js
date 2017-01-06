//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
        'app/lib/angularjs/angular.min.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'app/controllers/controller.js',
        'app/js/*.js',
        'app/unitTests/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
