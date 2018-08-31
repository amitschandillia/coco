const CACHE_NAME = "site-cache-v1";
const urlsToCache = ["/"];

// Call install event
self.addEventListener("install", e => {
  console.log('installed site cache');
});

// Call activate event
self.addEventListener("activate", e => {
  console.log('service worker activated');
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== CACHE_NAME) {
            console.log('clearing out old cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

// Call fetch event
self.addEventListener("fetch", e => {
  console.log('fetching...');
  e.respondWith(
    fetch(e.request)
    .then(res => {
      // Clone response
      const RESCLONE = res.clone();
      console.log('cloned');
      // Open cache
      caches
      .open(CACHE_NAME)
      .then(cache => {
        // Add response to cache
        cache.put(e.request, RESCLONE);
        console.log('response added');
      });
      return res;
    }).catch(err => caches.match(e.request).then(res => res))
  );
});
