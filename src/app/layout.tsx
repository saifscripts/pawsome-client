import { fontSans } from '@/config/fonts';
import '@/styles/globals.css';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Pawsome | Pet Care Tips & Heartwarming Stories',
  description:
    'Dive into expert pet care tips on grooming, nutrition, and health. Explore inspiring stories of rescue, adoption, and the unbreakable bond between pets and their owners. Pawsome Insights offers practical advice and heartwarming tales for every pet lover!',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
