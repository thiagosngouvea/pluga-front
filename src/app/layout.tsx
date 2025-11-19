import React from 'react';
import type { Metadata } from 'next';
import { AppProvider } from '@/src/features/apps/context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pluga Challenge Front',
  description: 'Aplicação para listar e buscar ferramentas integradas à Pluga',
  icons: {
    icon: 'https://assets.pluga.co/site/images/favicons/favicon-32x32.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

