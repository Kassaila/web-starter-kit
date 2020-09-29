/**
 * Build custom styles files listed in the config
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sortMedia = require('postcss-sort-media-queries');
const cssnano = require('cssnano');
const rename = require('gulp-rename');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

sass.compiler = require('sass');

module.exports = function () {
  const production = global.isProduction();
  const { filesCustom, isSortMedia } = global.buildStyles.getFilesCustom();
  const plugins = [
    autoprefixer(),
  ];

  if (isSortMedia) {
    plugins.push(sortMedia({ sort: global.buildStyles.sortType, }));
  }
  if (production) {
    plugins.push(cssnano());
  }

  return (done) => {
    if (filesCustom.length > 0) {
      return gulp.src(filesCustom, { sourcemaps: !production })
        .pipe(rename((file) => ({ dirname: file.dirname, basename: !production ? file.basename : `${file.basename}.min`, extname: '.css' })))
        .pipe(sass.sync({ sourceMap: !production, }))
        .on('error', (error) => notifier.error(error.message, 'Custom Sass compiling error', done))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(`./${global.folder.dev}/css`, { sourcemaps: './' }));
    }

    return done();
  };
};
