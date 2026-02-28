// src/bootstrap.js
// Ensure Coupa-like URL params exist BEFORE any other module loads.
// Then dynamically import the real app entry so every import sees them.

const DEFAULT_HOST = 'https://ey-in-demo.coupacloud.com';
const DEFAULT_ID = '69';

(function ensureCoupaParams() {
  const url = new URL(window.location.href);
  const p = url.searchParams;
  let changed = false;

  // Some code checks 'host', others 'coupaHost' or 'tenant'
  const hostKeys = ['host', 'coupaHost', 'tenant'];
  const hasHost = hostKeys.some(k => p.get(k));
  if (!hasHost) {
    hostKeys.forEach(k => p.set(k, DEFAULT_HOST));
    changed = true;
  }

  // Some code checks 'iframeId', others 'clientId', 'iframe_id', or 'id'
  const idKeys = ['iframeId', 'clientId', 'iframe_id', 'id'];
  const hasAnyId = idKeys.some(k => p.get(k));
  if (!hasAnyId) {
    idKeys.forEach(k => p.set(k, DEFAULT_ID));
    changed = true;
  }

  // Optional: debug – see what the page will use
  // console.log('[bootstrap] URL after normalize:', url.toString());

  if (changed) {
    // Update the address bar WITHOUT a reload so subsequent imports read new params
    history.replaceState(null, '', url.toString());
  }
})();

// After params are guaranteed, import the real app entry
import('./main-entry.js');