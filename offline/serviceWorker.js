const CACHE_NAME = "version-1";
const urlsToCache = ["/"];

// Call install event
self.addEventListener("install", e => {
  e.waitUntil(
    caches
    .open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
    .then(() => self.skipWaiting())
  );
});

// Call activate event
self.addEventListener("activate", e => {
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

// Call fetch event
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
});
