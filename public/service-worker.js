/*
  Basic PWA Service Worker
  - Versioned cache with cleanup
  - Cache-first for static assets (CSS/JS/images)
  - Network-first for navigation/HTML requests with offline fallback
  - See PWA_SETUP.md for customization instructions
*/

/* eslint-disable no-restricted-globals */
const SW_VERSION = 'v1.0.0';
const RUNTIME_CACHE = `runtime-${SW_VERSION}`;
const STATIC_CACHE = `static-${SW_VERSION}`;

// Customize these URLs to pre-cache critical shell assets
const CORE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

function isNavigationRequest(request) {
  return request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/static/') ||
    url.pathname.match(/\.(?:js|css|png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?|ttf|eot)$/)
  );
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Network-first for navigation/HTML
  if (isNavigationRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          // Clone and store for offline
          cache.put(request, fresh.clone());
          return fresh;
        } catch (err) {
          const cached = await caches.match(request);
          return cached || (await caches.match('/offline.html')) || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }

  // Cache-first for static assets
  if (isStaticAsset(request)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        try {
          const resp = await fetch(request);
          const cache = await caches.open(STATIC_CACHE);
          cache.put(request, resp.clone());
          return resp;
        } catch (err) {
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  // Default: try network, then cache
  event.respondWith(
    (async () => {
      try {
        return await fetch(request);
      } catch (err) {
        const cached = await caches.match(request);
        return cached || Response.error();
      }
    })()
  );
});

// Listen for manual skipWaiting from the page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Optional: handle Web Push payloads (requires backend to send push)
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'Update', body: event.data?.text() };
  }
  const title = data.title || 'Notification';
  const options = {
    body: data.body || '',
    icon: data.icon || '/Apps.png',
    badge: data.badge || '/Apps.png',
    data: data.url ? { url: data.url } : undefined,
    tag: data.tag || undefined,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';
  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
      const client = allClients.find((c) => 'url' in c && c.url.includes(self.location.origin));
      if (client && 'focus' in client) {
        client.focus();
        if (targetUrl) client.navigate(targetUrl);
        return;
      }
      if (clients.openWindow) {
        await clients.openWindow(targetUrl);
      }
    })()
  );
});


