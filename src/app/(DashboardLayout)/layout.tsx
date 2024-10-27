import '@/styles/globals.css';

import { Navbar } from '@/components/ui/navbar';
import Sidebar from './_components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100svh] overflow-hidden flex flex-nowrap">
      <Sidebar />
      <div className="h-full flex-1">
        <Navbar />
        <main className="h-[calc(100svh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
