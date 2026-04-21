// sw.js - Service Worker Moderno para SisDenWeb 3.0

const VERSION = '3.0.1';
const CACHE_NAME = `sisdenweb-${VERSION}`;
const OFFLINE_PAGE = '/source/html/offline.html'; 

// Arquivos essenciais que devem ser cacheados imediatamente
const STATIC_ASSETS = [
  '/',
  '/source/html/index.html',
  '/source/html/login/login.html',
  '/source/html/admin/admin-management.html',
  '/source/html/admin/dashboard.html',
  '/source/html/employer/employer-cases.html',
  '/source/html/paciente/minhas-denuncias.html',
  '/source/html/offline.html',
  '/manifest.json',
  // Ícones e imagens importantes
  '/assets/logo.png',
  '/assets/icone_osm.png',
  '/assets/icone_satellite.png',
  '/assets/heat-map.png',
  '/assets/map-marker.png'
];

// ==================== INSTALL ====================
self.addEventListener('install', event => {
  console.log(`🚀 Service Worker ${VERSION} instalando...`);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ==================== ACTIVATE ====================
self.addEventListener('activate', event => {
  console.log(`✅ Service Worker ${VERSION} ativado.`);

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// ==================== FETCH ====================
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignorar requisições do Firebase (não queremos cachear chamadas de API)
  if (url.hostname.includes('firebase') || url.hostname.includes('firestore')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_PAGE))
    );
    return;
  }

  // Estratégia: Cache First para assets estáticos
  if (event.request.destination === 'image' || 
      event.request.destination === 'style' || 
      event.request.destination === 'script' ||
      event.request.url.endsWith('.html')) {

    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          return cachedResponse || fetch(event.request).then(networkResponse => {
            // Cacheia a resposta para próximas requisições
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          });
        })
        .catch(() => caches.match(OFFLINE_PAGE))
    );
  } 
  // Para navegação (HTML), usa Network First com fallback offline
  else if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => response)
        .catch(() => caches.match(OFFLINE_PAGE))
    );
  }
  // Demais requisições: Stale While Revalidate
  else {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    );
  }
});

// ==================== BACKGROUND SYNC (futuro) ====================
self.addEventListener('sync', event => {
  if (event.tag === 'sync-denuncias') {
    console.log('🔄 Sincronizando denúncias pendentes...');
    // Aqui você pode implementar sync de denúncias offline no futuro
  }
});