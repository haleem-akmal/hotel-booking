// frontend/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext.tsx';
// 1. react-query-லிருந்து இவற்றை Import செய்யவும்
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 2. QueryClient-இன் ஒரு புதிய instance-ஐ உருவாக்கவும்
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        {/* 3. <App />-ஐ <QueryClientProvider>-ஆல் சுற்றவும் */}
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);