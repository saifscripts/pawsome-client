'use client';

import { Button } from '@nextui-org/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const router = useRouter();

  return (
    <div className="flex gap-2 items-center p-2 border-b border-divider">
      <Button onClick={() => router.back()} variant="light" isIconOnly>
        <ArrowLeftIcon size={18} />
      </Button>
      <h1 className="text-2xl">Edit Post</h1>
    </div>
  );
}
