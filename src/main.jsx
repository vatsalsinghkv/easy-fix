import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import UseUrlProvider from './context/UrlContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UseUrlProvider>
      <App />
    </UseUrlProvider>
  </React.StrictMode>
);
