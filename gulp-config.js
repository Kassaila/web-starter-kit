const global = {
  task: {
    lintHtml: 'lint-html',
    lintJs: 'lint-js',
    fixJs: 'fix-js',
    buildHtml: 'build-html',
    buildJs: 'build-js',
    buildStyles: 'build-styles',
    buildStylesCustom: 'build-styles-custom',
    buildStylesVendors: 'build-styles-vendors',
    buildImages: 'build-images',
    cleanBuild: 'clean-build',
    copyFiles: 'copy-files',
    copyFilesProd: 'copy-files-production',
    browserSync: 'browser-sync',
    watch: 'watch',
    build: 'build',
  },
  folder: {
    tasks: 'tasks',
    src: 'src',
    dev: 'assets',
    build: 'production',
  },
  file: {
    html: {
      main: 'index.html',
    },
    js: {
      main: 'app',
      vendor: 'vendor',
    },
    styles: {
      main: 'styles',
      vendor: 'vendor',
    },
  },
  buildHtml: {
    templates: 'src/html/templates',
  },
  buildStyles: {
    // Sorting type css media queries: 'desktop-first' || 'mobile-first'
    sortType: 'desktop-first',
    getFilesCustom() {
      return {
        filesCustom: [],
        isSortMedia: false,
      };
    }
  },
  buildJs: {
    getEntryPoints() {
      return {
        [global.file.js.main]: `./${global.folder.src}/js/${global.file.js.main}`,
      };
    },
    getExternalLibs: {},
  },
  buildImages: {
    imageExtensions: 'jpg,jpeg,png,svg,gif,ico',
    isImageMin: false,
  },
  error: {
    sound: true,
    title: '< SYSTEM ERROR >',
    icon: './system_files/icons/error_icon.png',
    wait: true,
  },
  getFilesToCopy() {
    return [
      `./${global.folder.src}/**`,
      `!{${global.folder.src}/images,${global.folder.src}/images/**}`,
      `!{${global.folder.src}/js,${global.folder.src}/js/**}`,
      `!{${global.folder.src}/html,${global.folder.src}/html/**}`,
      `!{${global.folder.src}/scss,${global.folder.src}/scss/**}`,
      `!{${global.folder.src}/vendor_entries,${global.folder.src}/vendor_entries/**}`,
    ];
  },
  getFilesToCopyProd() {
    return [
      `./${global.folder.dev}/**`,
      '.htaccess',
    ];
  },
  isProduction() {
    return process.argv[process.argv.length - 1] === global.task.build;
  },
  isFixJs() {
    return process.argv[process.argv.length - 1] === global.task.fixJs;
  }
};

module.exports = global;
