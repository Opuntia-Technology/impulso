const VERSION = '4b7657dde9782cd7';
const FILES = ["index.html","app.js","domain.js","style.css","keyboard.js","notifications.js","quote-list.js","daily-quotes.js","app.html","landing.css","landing.js","icon-192.png","icon-512.png","apple-touch-icon.png","favicon-32.png","favicon.ico","pwa.js","manifest.webmanifest"];
const PREFIX = 'impulso-pwa:' + self.registration.scope + ':';
const CACHE = PREFIX + VERSION;
const URLS = FILES.map(file => new URL(file, self.registration.scope).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(URLS.map(url => new Request(url, {cache:'reload'})))));
  // This compatibility fix takes control without reloading open forms or touching records.
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  if (url.pathname.startsWith(new URL('downloads/',scope).pathname)) return;
  if (request.mode === 'navigate') {
    if (![scope.pathname,new URL('index.html',scope).pathname,new URL('app.html',scope).pathname].includes(url.pathname)) return;
    const page = url.pathname === new URL('app.html',scope).pathname ? 'app.html' : 'index.html';
    if (page === 'index.html') {
      event.respondWith(fetch(request).then(response => {
        if (!response.ok) throw new Error('Home unavailable');
        return response;
      }).catch(() => caches.open(CACHE).then(cache => cache.match(new URL(page,scope).href))));
      return;
    }
    event.respondWith(caches.open(CACHE).then(cache => cache.match(new URL(page, scope).href)).then(cached => cached || fetch(request)));
    return;
  }
  if (!URLS.includes(url.href)) return;
  event.respondWith(caches.open(CACHE).then(cache => cache.match(request)).then(cached => cached || fetch(request)));
});
