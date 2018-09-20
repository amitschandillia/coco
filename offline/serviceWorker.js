const CACHE_NAME = '298acc6242a4150569f2c3ebce8bd388';
const URLS_TO_CACHE = [
  '/',
  '/about',
  '/index',
  '/favicon.ico',
  '/_f/images/icons/icon-128x128.png',
  '/_f/images/icons/icon-144x144.png',
  '/_f/images/icons/icon-152x152.png',
  '/_f/images/icons/icon-192x192.png',
  '/_f/images/icons/icon-384x384.png',
  '/_f/images/icons/icon-512x512.png',
  '/_f/images/icons/icon-72x72.png',
  '/_f/images/icons/icon-96x96.png',
  '/_f/images/icons/icon-apple.png',
  '/_f/images/profile.jpg',
  '/_f/images/sidenavHeader.jpg',
  '/_f/scripts/materialize.min.js',
  '/_f/manifest.json',
  '/_s/80c3c130783ddfb0011b184eacaf5ef2.min.css',
];
// Call install event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});
// Call activate event
self.addEventListener('activate', (e) => {
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
}
        })
      );
})
  );
});
// Call fetch event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
