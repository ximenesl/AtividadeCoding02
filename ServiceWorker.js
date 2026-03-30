const CACHE_NAME = 'pussycat-v1';
const ASSETS = [
  './',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png'
];

// Instalação: Armazena o "esqueleto" do app no cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cacheando arquivos do app shell');
      return cache.addAll(ASSETS);
    })
  );
});


self.addEventListener('activate', (e) => {
  console.log('Service Worker ativo');
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});