// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js
// Feel free with using ES6 here.

import dots from './modules/dots';

// Check service worker in browser
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

(($) => {
  // When DOM is ready
  $(() => {
    dots();
  });
})(jQuery);
