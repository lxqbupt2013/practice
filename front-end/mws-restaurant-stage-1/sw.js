var mainPageCacheName = 'mainPage-v1';
var infoPageCacheName = 'infoPage-v1';

var mainResqArr = [
    '/',
    'css/new.css',
    'css/styles.css',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg'
];


var infoResqArr = [
    '/',
    'css/new.css',
    'css/styles.css',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg'
];

self.addEventListener('install', function(event) {
    // TODO: cache /skeleton rather than the root page
    caches.open(mainPageCacheName).then(function(cache) {
        for(var i = 0; i < mainResqArr.length; i ++) {
            const request = new Request(mainResqArr[i], { mode: 'no-cors' });
            fetch(request).then(response => cache.put(request, response));
        }
    });

    caches.open(infoPageCacheName).then(function(cache) {
        for(var i = 0; i < infoResqArr.length; i ++) {
            const request = new Request(infoResqArr[i], { mode: 'no-cors' });
            fetch(request).then(response => cache.put(request, response));
        }
    });

});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mainPage-') &&
                 cacheName != mainPageCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('infoPage-') &&
                 cacheName != infoPageCacheName;
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

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
