const cache = 'mws-cache-1';

const urlsToCache = [
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
]

self.addEventListener('install', function(evt) {
    console.log('installing....');

    evt.waitUntil(
        // open a cache
        caches.open(cache)
        .then(function(cache) {
            console.log('Cache is opened...');

            // cache files
            return cache.addAll(urlsToCache);
        })
        .catch(function(e) {
            console.log('Cached failed: ', e);
        })
    )
});