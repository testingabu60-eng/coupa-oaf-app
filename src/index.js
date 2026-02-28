// src/index.js
import { createRoot } from 'react-dom/client';
import React from 'react';

// If your CSS is actually at src/styles/index.css, change to './styles/index.css'
import '../styles/index.css';

// ---- Coupa bootstrap params with safe defaults ----
// Your tenant host (base URL you log into)
const DEFAULT_HOST = 'https://ey-in-demo.coupacloud.com';
// Your Floating IFrame Client ID (you said it is 69)
const DEFAULT_IFRAME_ID = '69';

const params = new URLSearchParams(window.location.search);

// Read params if present; otherwise use defaults so the page does not crash outside Coupa
const host = params.get('host') || DEFAULT_HOST;
const iframeId = params.get('iframeId') || params.get('clientId') || DEFAULT_IFRAME_ID;
// Some code paths might expect "clientId"; keep both in sync
const clientId = params.get('clientId') || iframeId;

// Optional: expose globally if other code reads from window
window.COUPA_EMBED = { host, iframeId, clientId };

import Main from './app/Main.jsx';

createRoot(document.getElementById('root')).render(
  React.createElement(Main, { host, iframeId, clientId })
);
