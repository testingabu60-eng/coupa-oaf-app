// src/index.js
import { createRoot } from 'react-dom/client';
import React from 'react';

// ⚠️ If your CSS file actually lives at src/styles/index.css, change to './styles/index.css'
import '../styles/index.css';

// --- Coupa bootstrap parameters ---
// Set your Coupa tenant host and the Client ID of your IFrame (from Coupa Admin)
const DEFAULT_HOST = 'https://ey-in-demo.coupacloud.com';
const DEFAULT_IFRAME_ID = '1234567890';

// Read from URL if present; otherwise use defaults (so app works outside Coupa)
const params = new URLSearchParams(window.location.search);
const host = params.get('host') || DEFAULT_HOST;
const iframeId = params.get('iframeId') || DEFAULT_IFRAME_ID;

// Optional: expose globally if some code reads it from window
window.COUPA_EMBED = { host, iframeId };

import Main from './app/Main.jsx';

createRoot(document.getElementById('root')).render(
  React.createElement(Main, { host, iframeId })
);