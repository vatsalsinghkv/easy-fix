import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import UseUrlProvider from './context/UrlContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UseUrlProvider>
      <App />
    </UseUrlProvider>
  </React.StrictMode>
);
