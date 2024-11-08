'use client';

import UserCard from '@/components/user/UserCard';
import { IUser } from '@/types';
import { Button } from '@nextui-org/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Topbar({ author }: { author: IUser }) {
  const router = useRouter();

  return (
    <div className="flex gap-2 items-center p-2 border-b border-divider">
      <Button onClick={() => router.back()} variant="light" isIconOnly>
        <ArrowLeftIcon size={18} />
      </Button>
      <UserCard user={author} className="w-auto px-3 py-2 rounded-full" />
    </div>
  );
}
