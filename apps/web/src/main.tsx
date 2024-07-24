import '@repo/ui/ui.css';
import './styles/globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Providers } from './providers';

ReactDOM.createRoot(document.querySelector('#app')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
