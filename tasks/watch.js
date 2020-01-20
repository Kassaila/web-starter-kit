/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp');

module.exports = function (options) {

  return () => {
    gulp.watch([`./js/**/*`, `!./js/_compiled/**/*`], gulp.series(options.tasks.lintJs, options.tasks.buildJs));

    gulp.watch(`./scss/**/*`, gulp.series(options.tasks.buildStyles));

    gulp.watch(`./${options.htmlTemplates}/**/*`, gulp.series(options.tasks.buildHtml, options.tasks.lintHtml));

    gulp.watch(`./assets/**/*.{${options.imageExtensions}}`)
      .on('add', gulp.series(options.tasks.imageMin));

    gulp.watch([`./${options.htmlDest}/**/*`, `./css/**/*`, `./js/_compiled/**/*`, `!./css/maps/*.map`])
      .on('change', options.browserSync.reload);
  };
};
