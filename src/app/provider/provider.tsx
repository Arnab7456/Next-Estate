'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
// import { Toaster } from 'react-hot-toast';

interface ProviderProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <>
          {children}
          {/* <Toaster position="bottom-left"  reverseOrder={false} /> */}
        </>
      </ThemeProvider>
    </ClerkProvider>
  );
}
