/**
 * Build styles for application
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const notify = require('gulp-notify');

sass.compiler = require('sass');

module.exports = function (options) {
  const plugins = [
    autoprefixer(),
  ];
  const errorConfig = {
    title: 'Sass compiling error',
    wait: true,
  };

  return () => {
    return gulp.src('./scss/main.scss')
      .pipe(sourcemaps.init({ loadMaps: true, }))
      .pipe(sass.sync({ sourceMap: true, }))
      .on('error', notify.onError(errorConfig))
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./css'));
  };
};
