/**
 * Build html from templates
 */
'use strict';

const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const notify = require('gulp-notify');

module.exports = function(options) {
  const config = {
    prefix: '@@',
    basepath: './keyscreens',
    indent: true,
  };
  const errorConfig = {
    title: 'HTML compiling error',
    wait: true,
  };

  return () => {
    return gulp
      .src('./keyscreens/**/*.html')
      .pipe(fileInclude(config))
      .on('error', notify.onError(errorConfig))
      .pipe(gulp.dest('./html'));
  };
};
