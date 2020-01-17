const args = require('minimist')(process.argv.slice(2));
// eslint-disable-next-line import/no-dynamic-require
const pathConfig = require(`./${args.pathfile}.js`);
const scenarios = pathConfig.array;

module.exports = {
  id: 'visual_test',
  viewports: [
    {
      label: 'phone',
      width: 320,
      height: 480,
    },
    {
      label: 'tablet-portrait',
      width: 700,
      height: 1024,
    },
    {
      label: 'tablet-landscape',
      width: 1024,
      height: 768,
    },
    {
      label: 'desktop',
      width: 1280,
      height: 1024,
    },
    {
      label: 'desktop-wide',
      width: 2000,
      height: 1024,
    },
  ],
  onBeforeScript: 'puppet/onBefore.js',
  onReadyScript: 'puppet/onReady.js',
  scenarios,
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report',
  },
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox'],
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};
