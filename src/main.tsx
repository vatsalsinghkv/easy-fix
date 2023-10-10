import App from '@/App';
import '@/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import ThemeProvider from './lib/hooks/use-theme';
import UrlProvider from './providers/urlProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UrlProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UrlProvider>
  </React.StrictMode>
);
