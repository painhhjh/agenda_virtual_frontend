import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Renderiza la aplicación principal de React en el elemento 'root' del DOM.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
