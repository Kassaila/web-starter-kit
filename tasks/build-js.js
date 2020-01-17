/**
 * Build js
 */
'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const notify = require('gulp-notify');

module.exports = function(options) {
  const babelConfig = {
    presets: ['@babel/preset-env'],
  };
  const errorConfig = {
    title: 'JS compiling error',
    wait: true,
  };

  return () => {
    return browserify({
      entries: './js/main.js',
    })
      .transform('babelify', babelConfig)
      .bundle()
      .on('error', notify.onError(errorConfig))
      .pipe(source('main.js'))
      .pipe(gulp.dest('./js/_compiled'));
  };
};
