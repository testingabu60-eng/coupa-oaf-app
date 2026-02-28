// src/main-entry.js
import { createRoot } from 'react-dom/client';
import React from 'react';

// If your CSS lives at src/styles/index.css, change this to './styles/index.css'
import '../styles/index.css';

import Main from './app/Main.jsx';

// Read (now guaranteed) params
const q = new URLSearchParams(window.location.search);
const host =
  q.get('host') ||
  q.get('coupaHost') ||
  q.get('tenant') ||
  'https://ey-in-demo.coupacloud.com';

const iframeId =
  q.get('iframeId') ||
  q.get('clientId') ||
  q.get('iframe_id') ||
  q.get('id') ||
  '69';

const clientId = q.get('clientId') || iframeId;

// Optional: expose for legacy reads
window.COUPA_EMBED = { host, iframeId, clientId };

createRoot(document.getElementById('root')).render(
  React.createElement(Main, { host, iframeId, clientId })
);