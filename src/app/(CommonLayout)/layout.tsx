import '@/styles/globals.css';

import LeftSidebar from '@/components/ui/left-sidebar';
import { Navbar } from '@/components/ui/navbar';
import RightSidebar from '@/components/ui/right-sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <LeftSidebar />
      <RightSidebar />
      <main className="ml-[300px] mr-[240px]">{children}</main>
    </div>
  );
}
