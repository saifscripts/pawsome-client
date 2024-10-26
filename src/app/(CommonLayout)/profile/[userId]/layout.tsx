import Header from './_components/Header';
import Tabs from './_components/Tabs';
import Topbar from './_components/Topbar';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar />
      <Header />
      <Tabs />
      {children}
    </>
  );
}
