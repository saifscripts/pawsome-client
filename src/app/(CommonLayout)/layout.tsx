import '@/styles/globals.css';

import { Navbar } from '@/components/ui/navbar';
import Sidebar from './_components/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100svh] overflow-hidden">
      <Navbar />
      <div className="h-[calc(100svh-64px)] overflow-hidden flex flex-nowrap">
        <Sidebar />
        <main className="h-full overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
