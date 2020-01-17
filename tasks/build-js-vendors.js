/**
 * Build js vendor (concatenate vendors array)
 */
'use strict';

const gulp = require('gulp');
const filesExist = require('files-exist');
const concat = require('gulp-concat');

module.exports = function(options) {
  const jsVendors = require('../js/vendor/vendor.js');
  const noneVendors = jsVendors.length === 0 ? true : false;

  return done => {
    if (noneVendors) return done();

    return gulp
      .src(filesExist(jsVendors))
      .pipe(concat(options.vendorJsMin))
      .pipe(gulp.dest(`./${options.dest}/js`));
  };
};
