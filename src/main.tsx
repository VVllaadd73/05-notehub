// src/main

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import App from './App/App';
 import { StrictMode } from "react";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <App />
      </QueryClientProvider>
   </StrictMode>
);
