/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-f4a86b0';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./krakatit_002.html","./krakatit_005.html","./krakatit_006.html","./krakatit_007.html","./krakatit_008.html","./krakatit_009.html","./krakatit_010.html","./krakatit_011.html","./krakatit_012.html","./krakatit_013.html","./krakatit_014.html","./krakatit_015.html","./krakatit_016.html","./krakatit_017.html","./krakatit_018.html","./krakatit_019.html","./krakatit_020.html","./krakatit_021.html","./krakatit_022.html","./krakatit_023.html","./krakatit_024.html","./krakatit_025.html","./krakatit_026.html","./krakatit_027.html","./krakatit_028.html","./krakatit_029.html","./krakatit_030.html","./krakatit_031.html","./krakatit_032.html","./krakatit_033.html","./krakatit_034.html","./krakatit_035.html","./krakatit_036.html","./krakatit_037.html","./krakatit_038.html","./krakatit_039.html","./krakatit_040.html","./krakatit_041.html","./krakatit_042.html","./krakatit_043.html","./krakatit_044.html","./krakatit_045.html","./krakatit_046.html","./krakatit_047.html","./krakatit_048.html","./krakatit_049.html","./krakatit_050.html","./krakatit_051.html","./krakatit_052.html","./krakatit_053.html","./krakatit_054.html","./krakatit_055.html","./krakatit_056.html","./krakatit_057.html","./krakatit_058.html","./krakatit_059.html","./krakatit_060.html","./krakatit_061.html","./krakatit_062.html","./krakatit_063.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
