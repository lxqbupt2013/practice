var mainPageCacheName = 'mainPage-v1';
var infoPageCacheName = 'infoPage-v1';

var mainResqArr = [
  	'https://maps.googleapis.com/maps/api/js?key=AIzaSyDM44CkBZDUXX7yApms7jv_THSjRRlmga8&libraries=places&callback=initMap',
  	'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/common.js',
  	'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/util.js',
  	'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/map.js',
  	'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff2',
  	'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
  	'https://maps.gstatic.com/mapfiles/api-3/images/tmapctrl.png',
  	'https://maps.gstatic.com/mapfiles/api-3/images/cb_scout5.png',
  	'https://maps.gstatic.com/mapfiles/api-3/images/tmapctrl4.png',
  	'https://maps.gstatic.com/mapfiles/mv/imgs8.png',
  	'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/stats.js',
  	'https://maps.gstatic.com/mapfiles/openhand_8_8.cur',
  	'https://maps.gstatic.com/mapfiles/api-3/images/sv9.png',
  	'https://maps.gstatic.com/mapfiles/api-3/images/mapcnt6.png',
  	'https://maps.gstatic.com/mapfiles/api-3/images/google4.png',
  	'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  	'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/controls.js',
  	'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png',
  	'https://maps.gstatic.com/mapfiles/transparent.png',
  	'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/marker.js',
  	'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/onion.js',
  	'https://maps.gstatic.com/mapfiles/openhand_8_8.cur'
];


var infoResqArr = [
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyDM44CkBZDUXX7yApms7jv_THSjRRlmga8&libraries=places&callback=initMap',
    'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/stats.js',
    'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/controls.js',
    'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/onion.js',
    'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/marker.js',
    'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/map.js',
    'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/util.js',
    'https://maps.googleapis.com/maps-api-v3/api/js/33/4/intl/zh_cn/common.js'
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
