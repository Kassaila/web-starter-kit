/**
 * Lint HTML
 */
'use strict';

const gulp = require('gulp');
const htmlhint = require('gulp-htmlhint');
const notify = require('gulp-notify');

module.exports = function(options) {
  const errorConfig = {
    title: 'HTML linting error',
    wait: true,
  };

  return done => {
    gulp
      .src(`./${options.dest}/**/*.html`)
      .pipe(
        htmlhint({
          'attr-lowercase': ['viewBox'],
        }),
      )
      .pipe(htmlhint.reporter('htmlhint-stylish'))
      .pipe(
        htmlhint.failOnError({
          suppress: true,
        }),
      )
      .on('error', notify.onError(errorConfig));

    return done();
  };
};
