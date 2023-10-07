import App from '@/App';
import '@/index.css';
import UseUrlProvider from '@/lib/hooks/use-url.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

import ThemeProvider from './lib/hooks/use-theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UseUrlProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UseUrlProvider>
  </React.StrictMode>
);
