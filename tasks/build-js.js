/**
 * Build js
 */
'use strict';

const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const notifier = require('../helpers/notifier');
const global = require('../gulp-config.js');

module.exports = function () {
  const production = global.isProduction();
  const entryPoints = global.buildJs.getEntryPoints();

  return (done) => {
    try {
      const config = {
        mode: !production ? 'development' : 'production',
        entry: entryPoints,
        output: {
          path: path.resolve(global.folder.dev, `js/`),
          filename: !production ? '[name].js' : '[name].min.js',
        },
        optimization: {
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
              vendor: {
                test: /[\\/](node_modules|vendor_entries)[\\/]/,
                filename: !production ? `${global.file.js.vendor}.js` : `${global.file.js.vendor}.min.js`,
              },
            },
          },
          minimize: production,
          minimizer: [new TerserPlugin()],
          usedExports: true,
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
              }
            }
          ]
        },
        externals: global.buildJs.externalLibs,
      };

      webpack(config, (error, stats) => {
        if (error) {
          throw new Error(error);
        }

        if (production) {
          console.log(
            stats.toString({
              version: false,
              hash: false,
              chunks: false,
              colors: true,
            })
          );
        }

        return done();
      });
    } catch (error) {
      notifier.error(error, 'JS compiling error', done);
    }
  };
};
