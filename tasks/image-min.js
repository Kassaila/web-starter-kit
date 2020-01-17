/**
 * Minify images
 */
'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

module.exports = function(options) {
  return () => {
    return gulp
      .src('./assets/**/*.{gif,png,jpg,jpeg,svg}')
      .pipe(newer('./assets/**/*.{gif,png,jpg,jpeg,svg}'))
      .pipe(
        imagemin([
          imagemin.gifsicle({
            interlaced: true,
          }),
          imagemin.jpegtran({
            progressive: true,
          }),
          imagemin.optipng({
            optimizationLevel: 5,
          }),
          imagemin.svgo({
            plugins: [
              {
                removeViewBox: false,
                collapseGroups: true,
                removeComments: true,
              },
            ],
          }),
        ]),
      )
      .pipe(
        gulp.dest(function setFile(file) {
          return file.base;
        }),
      );
  };
};
