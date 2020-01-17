import '@babel/polyfill';
import 'slick-carousel';
import 'object-fit-images';

import accordion from './object/accordion';
import inlineVideo from './object/video';
import column from './object/column';
import instagramLoader from './object/instafeed';
import twitterLoader from './object/twitter';
import catalogProgram from './object/catalog-program';
import carousel from './object/carousel';
import programFinder from './object/program-finder';
import calendar from './object/calendar';
import catalog from './object/catalog';

window.$ = require('jquery');
window.jQuery = require('jquery');
const objectFitImages = require('object-fit-images');

$(() => {
  accordion.init();
  inlineVideo.init();
  instagramLoader.init();
  twitterLoader.init();
  calendar.init();
  catalogProgram.init();
  carousel.init();
  programFinder.init();
  catalog.init();
  objectFitImages();

  // Run after instagram and others have loaded
  $(window).on('load resize', () => {
    setTimeout(() => {
      column.init();
    }, 100);
  });
});
