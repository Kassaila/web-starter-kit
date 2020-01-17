/**
 * Clean build folder
 */
'use strict';

const del = require('del');

module.exports = function (options) {
  const dir = [
    `./html`,
    `./css/main.css`,
    `./css/maps`,
    `./js/_compiled`,
  ];
  const config = {
    force: true,
  };

  return async () => {
    const deletedPaths = await del(dir, config);

    // log paths for deleted files & directories
    // console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
  };
};
