/**
 * Build styles for vendor
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssimport = require('postcss-import');
const notify = require('gulp-notify');

sass.compiler = require('sass');

module.exports = function (options) {
  const plugins = [
    cssimport(),
  ];
  const errorConfig = {
    title: 'Sass compiling error',
    wait: true,
  };

  return () => {
    return gulp.src(`./${options.src}/vendor_entries/${options.vendorScss}`)
      .pipe(sass.sync())
      .on('error', notify.onError(errorConfig))
      .pipe(postcss(plugins))
      .pipe(gulp.dest(`./${options.dest}/css`));
  };
};
