'use client';

import { IUser } from '@/types';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

interface IProps {
  user: IUser;
}

export default function Topbar({ user }: IProps) {
  const router = useRouter();

  return (
    <div className="flex gap-2 items-center p-2 border-b">
      <Button onClick={() => router.back()}>Back</Button>
      <h1 className="text-2xl uppercase">{user?.name}</h1>
    </div>
  );
}
