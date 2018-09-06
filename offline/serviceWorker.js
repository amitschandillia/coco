const CACHE_NAME = "version-0.0.22";
const URLSTOCACHE = ["/"];

// Call install event
self.addEventListener("install", e => {
  e.waitUntil(
    caches
    .open(CACHE_NAME)
    .then(cache => cache.addAll(URLSTOCACHE))
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
