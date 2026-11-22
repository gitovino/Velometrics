/* Provisio service worker — maakt de app installeerbaar en offline bruikbaar.
   - App-pagina: eerst netwerk (zo krijg je updates meteen), offline uit de cache.
   - Lettertypen en bibliotheken (Google Fonts, jsDelivr): uit de cache, anders netwerk.
   - Synchronisatie (Google) en productopzoekingen (Open Food Facts) gaan altijd rechtstreeks. */
const VERSION = 'provisio-v7';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];
const CDN = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net|tfhub\.dev|www\.kaggle\.com|storage\.googleapis\.com)\//;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k.startsWith('provisio-')).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html')) {
      e.respondWith(fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); } return res; })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./'))));
      return;
    }
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; })));
    return;
  }
  if (CDN.test(req.url)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; })));
  }
});
