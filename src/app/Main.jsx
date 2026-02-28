// src/app/Main.jsx
import React, { StrictMode, useEffect } from 'react';
import { OafProvider } from '../features/oaf/OafContext';
import App from './App';

const Main = ({ host, iframeId }) => {
  // Optional: log once to verify values reached the tree
  useEffect(() => {
    console.log('Main mounted with:', { host, iframeId });
  }, [host, iframeId]);

  return (
    <StrictMode>
      {/* Provide host & iframeId to context if your OafProvider expects them */}
      <OafProvider host={host} iframeId={iframeId}>
        <App host={host} iframeId={iframeId} />
      </OafProvider>
    </StrictMode>
  );
};

export default Main;