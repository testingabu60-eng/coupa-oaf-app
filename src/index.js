// src/index.js
import { createRoot } from 'react-dom/client';
import React from 'react';

// styles folder is a sibling of src
import '../styles/index.css';

// IMPORTANT: Capital M to match file name on Linux/Vercel
import Main from './app/Main.jsx';

createRoot(document.getElementById('root')).render(
  React.createElement(Main)
);