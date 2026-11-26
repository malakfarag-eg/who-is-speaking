const CACHE = 'who-is-speaking-v5';
const FILES = ['./', 'index.html', 'style.css', 'app.js', 'manifest.webmanifest', 'assets1.js', 'assets2.js', 'assets3.js', 'assets4.js', 'assets5.js', 'assets6.js', 'assets7.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { if (r && r.ok) { const c = r.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); } return r; }).catch(() => caches.match(e.request)));
});
