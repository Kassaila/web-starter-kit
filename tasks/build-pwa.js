/**
 * Build PWA
 * 
 */
'use strict';

const { rollup } = require('rollup');
const workboxBuild = require('workbox-build');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

module.exports = function () {

  return async () => {
    try {
      const bundle = await rollup({
        input: `./${global.folder.src}/js/sw.js`,
        treeshake: false,
        plugins: [],
        onwarn(warning, warn) {
          throw new Error(warning.message);
        },
      });

      const tempJs = await bundle.write({
        file: `./${global.folder.temp}/js/sw.temp.js`,
        format: 'iife',
        name: 'sw',
        sourcemap: false,
      });
      const tempJsFileName = tempJs.output[0].fileName;

      await workboxBuild.injectManifest({
        swSrc: `./${global.folder.temp}/js/${tempJsFileName}`,
        swDest: `./${global.folder.dev}/sw.js`,
        globDirectory: `${global.folder.dev}`,
        globPatterns: [
          '**/*.{webmanifest,html,js,css,png,jpeg,jpg,svg,ico}',
        ],
      }).then(({ count, size, warnings }) => {
        warnings.forEach((error) => console.log(`\u{1b}[31m ${error} \u{1b}[0m`));

        console.log(`\u{1b}[32m Precache ${count} files, totaling size ${(size / (1024 * 1024)).toFixed(2)} MB \u{1b}[0m`);
      });
    } catch (error) {
      notifier.error(error, 'PWA building error', done);
    }
  };
};
