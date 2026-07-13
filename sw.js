/* Service Worker for 抄表助手 PWA */
var CACHE = 'meter-reader-v2';
var SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(SHELL); }));
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  // Never cache GitHub API calls — always network for Gist read/write
  if (e.request.url.indexOf('api.github.com') !== -1 || e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(res) {
        // only cache same-origin and google fonts
        if (res.status === 200 && (e.request.url.startsWith(self.location.origin) ||
            e.request.url.indexOf('fonts.googleapis.com') !== -1 ||
            e.request.url.indexOf('fonts.gstatic.com') !== -1)) {
          var c = res.clone();
          caches.open(CACHE).then(function(cache) { cache.put(e.request, c); });
        }
        return res;
      });
    })
  );
});
