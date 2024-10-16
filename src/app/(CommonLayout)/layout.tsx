import '@/styles/globals.css';

import { Navbar } from '@/components/ui/navbar';

export default function RootLayout({
  children,
  leftSidebar,
  rightSidebar,
}: {
  children: React.ReactNode;
  leftSidebar: React.ReactNode;
  rightSidebar: React.ReactNode;
}) {
  return (
    <div className="h-[100svh] overflow-hidden">
      <Navbar />
      <div className="h-[calc(100svh-64px)] overflow-y-auto flex flex-nowrap">
        {leftSidebar}
        <main className="h-full overflow-y-scroll flex-1">{children}</main>
        {rightSidebar}
      </div>
    </div>
  );
}
