# PWA Setup and Customization Guide

This project includes a Progressive Web App (PWA) baseline: manifest, service worker, and an offline fallback.

## Files
- public/manifest.json: App metadata (name, icons, colors, display mode).
- public/service-worker.js: Caching strategies and versioning.
- public/offline.html: Offline fallback page.
- src/components/PWARegister.tsx: Client component to register the service worker.
- src/app/layout.tsx: Adds the manifest link, theme-color meta, and <PWARegister />.
 - src/components/NotificationPrompt.tsx: Client component that requests Notification permission once.

## Customize the Manifest (public/manifest.json)
- name, short_name: Install prompt and launcher names.
- start_url: Entry route when launched from Home Screen (e.g., "/").
- display: "standalone" for app-like UI (or "fullscreen").
- theme_color, background_color: Splash screen and browser UI colors.
- icons: Provide at least 192x192 and 512x512. Replace Apps.png and Saas.png with your own assets at those sizes.
- Optional: description, lang, orientation.

## Caching and Updates (public/service-worker.js)
- SW_VERSION: Bump after deployments to invalidate old caches.
- CORE_ASSETS: Add routes/files to precache for offline (e.g., "/", critical CSS, key icons).
- Strategies used:
  - Navigation/HTML: Network-first with offline fallback (/offline.html).
  - Static assets: Cache-first for /_next/*, images, fonts, CSS/JS.
- Optional immediate activation after update:
```
navigator.serviceWorker.getRegistration().then(r => r?.waiting?.postMessage({ type: 'SKIP_WAITING' }));
```

## HTTPS Requirement
Service workers require a secure context:
- Production: Serve via HTTPS.
- Development: localhost is allowed.

## Test Installability
Use Chrome DevTools > Application > Manifest and Lighthouse (PWA):
- Manifest valid: name, short_name, start_url, display, theme_color, background_color, icons (192 and 512).
- Service worker controls the page and provides offline support.
- Served over HTTPS or localhost; no mixed-content errors.

## Offline Fallback
- If navigation fails, the SW serves /offline.html.
- Customize markup/styles in public/offline.html.

## Advanced (Optional)
- Push Notifications: Implement Web Push with a backend (VAPID keys, subscriptions).
- Background Sync: Queue failed POSTs (IndexedDB) and retry when back online.
- Workbox or next-pwa: For build-time precaching and advanced strategies.
 - Notifications prompt: See src/components/NotificationPrompt.tsx. For real push, create subscriptions (PushManager) and store on your server; send Web Push payloads to trigger the SW `push` handler.

## Common Tweaks
- Apple touch icon and meta: Provide apple-touch-icon assets and meta tags in layout.tsx.
- Page-specific theme color: Set <meta name="theme-color"> dynamically if needed.

## Troubleshooting
- SW not updating: bump SW_VERSION, hard refresh, or unregister in Application > Service Workers.
- Assets not cached: check path patterns and same-origin constraints.
- Stale content: use network-first for APIs or add cache-busting headers.
