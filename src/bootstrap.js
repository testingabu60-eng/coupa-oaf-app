// src/bootstrap.js
// Ensure Coupa-like params exist in the URL BEFORE any other module loads.
// Then dynamically import the real app entry so every module sees these params.

const DEFAULT_HOST = 'https://ey-in-demo.coupacloud.com';
const DEFAULT_IFRAME_ID = '69';

(function ensureCoupaParams() {
  const url = new URL(window.location.href);
  const p = url.searchParams;

  let changed = false;

  // Host (tenant)
  if (!p.get('host') && !p.get('coupaHost') && !p.get('tenant')) {
    p.set('host', DEFAULT_HOST);
    changed = true;
  }

  // Id (many code paths use iframeId, some use clientId)
  const hasAnyId = p.get('iframeId') || p.get('clientId') || p.get('iframe_id') || p.get('id');
  if (!hasAnyId) {
    p.set('iframeId', DEFAULT_IFRAME_ID);
    changed = true;
  }

  // Update address bar without reload so subsequent imports read the new params
  if (changed) {
    history.replaceState(null, '', url.toString());
  }
})();

// Now import the real app entry (which mounts React, etc.)
import('./main-entry.js');