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

self.addEventListener('install', evt => {
    console.log('installing....');

    evt.waitUntil(
        // open a cache
        caches.open(cache)
        .then(cache => {
            console.log('Cache is opened...');

            // cache files
            return cache.addAll(urlsToCache);
        })
        .catch(err => {
            console.log('Cached failed: ', err);
        })
    )
});

self.addEventListener('fetch', evt => {
    console.log('request coming through: ', evt.request.url);

    evt.respondWith(
        // Check cache for image
        caches.match(evt.request).then(rsp => {
            if (rsp) {
                console.log('serving a request from cached! request: ', evt.request.url)
                
                // We have intercepted the request here
                // and are returning the response that was matched
                // in the cache for this particular event.request
                return rsp;
            }

            // at this point request not found in cache so
            // send it on it's way as usual. 
            // so we take the request and just send a response
            // that is just re-making the exact same request
            return fetch(evt.request)
        })
        .catch(err => {
            console.log('Unable to re-fetch request: ', err);
        })
    )
});