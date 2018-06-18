var staticCacheName = 'wittr-static-v3';

var resArr = [
	DBHelper.DATABASE_URL,
	'',
	''
]

self.addEventListener('install', function(event) {
  // TODO: cache /skeleton rather than the root page
/*
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(resArr);
    })
  );*/
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  // TODO: respond to requests for the root page with
  // the page skeleton from the cache

  resArr.push(event.request)

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );


  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(resArr);
    })
  );
});
/*
self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});*/