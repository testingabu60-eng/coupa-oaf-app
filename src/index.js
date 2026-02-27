// src/index.js
import { createRoot } from 'react-dom/client';
import React from 'react';

// The styles folder is a sibling of `src`, so this relative path is correct:
import '../styles/index.css';

// IMPORTANT: Capital M — must match the actual filename `src/app/Main.jsx`
import Main from './app/Main.jsx';

createRoot(document.getElementById('root')).render(
  React.createElement(Main)
);