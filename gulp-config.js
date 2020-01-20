module.exports = {
  folder: {
    tasks: 'tasks',
  },
  file: {
    mainHtml: 'index.html',
    mainJs: 'main.js',
    vendorJs: 'vendor.js',
    mainScss: 'styles.scss',
    vendorScss: 'vendor.scss',
  },
  buildHtml: {
    templates: 'keyscreens',
    dest: 'html',
  },
  task: {
    lintHtml: 'lint-html',
    lintJs: 'lint-js',
    buildHtml: 'build-html',
    buildJs: 'build-js',
    buildJsVendors: 'build-js-vendors',
    buildStyles: 'build-styles',
    buildStylesVendors: 'build-styles-vendors',
    imageMin: 'image-min',
    cleanBuild: 'clean-build',
    browserSync: 'browser-sync-server',
    watch: 'watch',
  },
  imageExtensions: 'gif,png,jpg,jpeg,svg',
};
