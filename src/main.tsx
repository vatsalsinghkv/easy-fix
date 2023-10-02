import App from '@/App';
import UseUrlProvider from '@/hooks/use-url.jsx';
import '@/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UseUrlProvider>
      <App />
    </UseUrlProvider>
  </React.StrictMode>
);
