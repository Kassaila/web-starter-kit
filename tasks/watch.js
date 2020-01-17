/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp');

module.exports = function (options) {

  return () => {
    gulp.watch(`./js/**/*`, gulp.series(options.tasks.lintJs, options.tasks.buildJs));

    gulp.watch(`./scss/**/*`, gulp.series(options.tasks.buildStyles));

    gulp.watch(`./keyscreens/**/*`, gulp.series(options.tasks.buildHtml, options.tasks.lintHtml));

    gulp.watch('./assets/**/*.{gif,png,jpg,jpeg,svg}')
      .on('add', gulp.series(options.tasks.imageMin));

    gulp.watch([`./html/**/*`, `./css/**/*`, `./js/_compiled/**/*`, `!./css/maps/*.map`])
      .on('change', options.browserSync.reload);
  };
};
