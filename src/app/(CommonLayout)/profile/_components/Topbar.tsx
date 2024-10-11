'use client';

import { useUser } from '@/hooks/profile.hook';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const router = useRouter();
  const { data } = useUser();
  const user = data?.data;
  if (!user) return null;

  return (
    <div className="flex gap-2 items-center p-2 border-b">
      <Button onClick={() => router.back()}>Back</Button>
      <h1 className="text-2xl uppercase">{user?.name}</h1>
    </div>
  );
}
