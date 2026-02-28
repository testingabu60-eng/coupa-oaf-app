// src/app/Main.jsx
import React, { StrictMode, useEffect, useMemo } from 'react';
import { OafProvider } from '../features/oaf/OafContext';
import App from './App';

// Normalize parameters from props, window, and URL (tolerant to different names)
function normalizeParams(incoming = {}) {
  const q = new URLSearchParams(window.location.search);

  const fromProps = incoming || {};
  const fromWin = window.COUPA_EMBED || {};

  const host =
    fromProps.host ||
    fromWin.host ||
    q.get('host') ||
    q.get('coupaHost') ||
    q.get('tenant') ||
    'https://ey-in-demo.coupacloud.com';

  const iframeIdRaw =
    fromProps.iframeId ||
    fromWin.iframeId ||
    q.get('iframeId') ||
    q.get('iframe_id') ||
    q.get('id') ||
    fromProps.clientId ||
    fromWin.clientId ||
    q.get('clientId') ||
    '69';

  const clientId = fromProps.clientId || fromWin.clientId || q.get('clientId') || iframeIdRaw;
  const iframeId = iframeIdRaw || clientId;

  return { host, iframeId, clientId };
}

const Main = (props) => {
  const { host, iframeId, clientId } = useMemo(() => normalizeParams(props), [props]);

  useEffect(() => {
    console.log('Main mounted with:', { host, iframeId, clientId });
  }, [host, iframeId, clientId]);

  return (
    <StrictMode>
      {/* Pass values under common keys and a config object to satisfy any consumer */}
      <OafProvider
        host={host}
        iframeId={iframeId}
        clientId={clientId}
        config={{ host, iframeId, clientId }}
      >
        <App host={host} iframeId={iframeId} clientId={clientId} />
      </OafProvider>
    </StrictMode>
  );
};

export default Main;