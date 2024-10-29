import App from '@/App';
import '@/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import FilterProvider from './lib/hooks/use-filter';
import ThemeProvider from './lib/hooks/use-theme';
import UrlProvider from './providers/urlProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UrlProvider>
      <ThemeProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </ThemeProvider>
    </UrlProvider>
  </React.StrictMode>
);
