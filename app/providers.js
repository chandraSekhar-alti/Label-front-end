'use client';

import { ThemeProvider } from '@/lib/theme/theme-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useState } from 'react';

export function Providers({ children }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } }
  }));

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={client}>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand={false}
          duration={3500}
          gap={12}
          offset={20}
          toastOptions={{
            classNames: {
              toast: 'rounded-lg border-border shadow-enterprise-md',
              title: 'text-sm font-semibold',
              description: 'text-xs',
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
