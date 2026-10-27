/* =========================================================
   DYNASTYVAULT — VISITOR COUNTER (for your admin dashboard: admin.html)
   Sends tiny anonymous events to YOUR server (config.js → server). No cookies, no names,
   no IP addresses are stored — only a random ID per phone, hashed on the server.
   OPTIONAL extra: free Cloudflare Web Analytics (countries, devices, top pages).
     Cloudflare → Analytics & Logs → Web Analytics → Add a site → copy the token → paste below.
   ========================================================= */
var DV_CF_TOKEN = '';   // ← optional: Cloudflare Web Analytics token, e.g. 'a1b2c3d4e5...'

(function () {
  var srv = String((window.DV_CONFIG || {}).server || '').trim().replace(/\/+$/, '');
  var did = '';
  try { did = localStorage.getItem('dv.did') || ''; if (!did) { did = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10); localStorage.setItem('dv.did', did); } } catch (e) { did = ''; }
  var page = (location.pathname.split('/').pop() || 'index').replace(/\.html?$/, '') || 'index';
  var q = {}; try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) { /* old browser */ }
  var ref = q.utm_source || q.ref || q.from || '';
  if (!ref && document.referrer) { try { var rh = new URL(document.referrer).hostname.replace(/^www\./, ''); if (rh && rh !== location.hostname) ref = rh.split('.').slice(-2, -1)[0] || rh; } catch (e) { /* ignore */ } }
  var local = /^(localhost|127\.)/.test(location.hostname) || location.protocol === 'file:';
  window.dvTrack = function (e, extra) {
    if (!srv || local && !window.DV_TRACK_LOCAL) return;
    var b = { e: e, d: did, p: page, l: (navigator.language || '').slice(0, 12) };
    if (extra) for (var k in extra) b[k] = extra[k];
    var body = JSON.stringify(b);
    try { if (navigator.sendBeacon && navigator.sendBeacon(srv + '/api/t', new Blob([body], { type: 'text/plain' }))) return; } catch (er) { /* fall back */ }
    try { fetch(srv + '/api/t', { method: 'POST', body: body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }); } catch (er) { /* offline */ }
  };
  try { if (!sessionStorage.getItem('dv.v.' + page)) { sessionStorage.setItem('dv.v.' + page, '1'); window.dvTrack('visit', { r: ref }); } } catch (e) { window.dvTrack('visit', { r: ref }); }
  if (DV_CF_TOKEN && !local) {
    var s = document.createElement('script'); s.defer = true; s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    s.setAttribute('data-cf-beacon', JSON.stringify({ token: DV_CF_TOKEN })); document.head.appendChild(s);
  }
})();
