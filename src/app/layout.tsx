import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pawsome | Pet Care Tips & Heartwarming Stories',
  description:
    'Dive into expert pet care tips on grooming, nutrition, and health. Explore inspiring stories of rescue, adoption, and the unbreakable bond between pets and their owners. Pawsome Insights offers practical advice and heartwarming tales for every pet lover!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
