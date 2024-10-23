'use client';

import AuthProvider from '@/contexts/auth.context';
import SubscriptionModalProvider from '@/contexts/subscription-modal.context';
import { NextUIProvider } from '@nextui-org/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Toaster } from 'sonner';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SubscriptionModalProvider>
            <Toaster />
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </SubscriptionModalProvider>
        </QueryClientProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}
