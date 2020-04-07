importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// cache name
workbox.core.setCacheNameDetails({
  prefix: 'pwa-cache',
  precache: 'pwa-precache',
  runtime: 'pwa-runtime',
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
