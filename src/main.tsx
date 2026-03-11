import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App'; // Assuming App.tsx is in src/app/
import '../src/styles/index.css'; // Assuming global styles are here

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);