'use client';

import { useUser } from '@/hooks/profile.hook';
import Header from './_components/Header';
import Topbar from './_components/Topbar';

export default function ProfilePage() {
  const { data } = useUser();

  const user = data?.data;

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Topbar user={user} />
      <Header user={user} />
    </>
  );
}
