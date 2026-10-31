/* DynastyVault — offline helper (service worker)
   Nabu: website pe kuch bhi naya daaloge to app khud naya version le lega (pehle internet, phir cache).
   Agar kabhi purana dikhe, neeche VERSION ka number badal do (v1 → v2) aur ye file dobara upload karo. */
const VERSION = 'dv-v1';
const SHELL = ['look.js', 'social.css', 'utsav.css', 'i18n.js', 'config.js', 'manifest.webmanifest',
  'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;   // server (Render), Supabase, fonts, payments: never touched
  if (url.pathname.endsWith('/sw.js') || url.pathname.endsWith('admin.html')) return;
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    try {   // always try the live website first, so every update shows up in the app
      const res = await fetch(req);
      if (res && res.ok && res.type === 'basic') cache.put(req, res.clone()).catch(() => {});
      return res;
    } catch (err) {   // offline → last saved copy
      const hit = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
      if (hit) return hit;
      if (req.mode === 'navigate') {
        const app = await cache.match('app.html', { ignoreSearch: true }) || await cache.match('./', { ignoreSearch: true }) || await cache.match('index.html', { ignoreSearch: true });
        if (app) return app;
        return new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DynastyVault</title><body style="margin:0;display:grid;place-items:center;min-height:100vh;background:#000;color:#fff;font:16px system-ui;text-align:center;padding:24px"><div><div style="font-size:48px">👑</div><p><b>No internet</b></p><p style="opacity:.75">Connect to the internet once and open DynastyVault again.<br>Internet se judo aur DynastyVault dobara kholo.</p></div>', { headers:{ 'Content-Type':'text/html; charset=utf-8' } });
      }
      return Response.error();
    }
  })());
});
