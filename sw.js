const assetsCache = 'mws-cache-v1';

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
    '/img/10.jpg',
    '/css/styles.css',
    '/js/restaurant_info.js',
    '/js/main.js',
    '/js/dbhelper.js',
    'restaurant.html',
    'index.html'
]

/**
 * Installs service worker with assets to cached
 */
self.addEventListener('install', evt => {
    console.log('installing....');

    evt.waitUntil(
        caches.open(assetsCache)
            .then(cache => {
                console.log('Cache is opened...');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.log('Cached install failed: ', err);
            })
    )
});

/**
 * Intercepts requests to serve/save cached assets
 */
self.addEventListener('fetch', evt => {

    evt.respondWith(
        // Open up cache for retrieval
        // or caching of new asset
        caches.open(assetsCache).then(cache => {
            return caches.match(evt.request).then(rsp => {
                return rsp || fetch(evt.request).then(rsp => {
                    cache.put(evt.request, rsp.clone());
                    return rsp;
                });
            })
                .catch(err => {
                    console.log('Unable to re-fetch request. Network error: ', err);
                });
        })
    );
});