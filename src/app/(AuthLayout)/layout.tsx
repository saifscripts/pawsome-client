import '@/styles/globals.css';

import { Navbar } from '@/components/ui/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100svh] overflow-hidden">
      <Navbar />
      <div className="h-[calc(100svh-64px)] overflow-y-auto">{children}</div>
    </div>
  );
}
