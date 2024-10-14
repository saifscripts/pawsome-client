'use client';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const router = useRouter();

  return (
    <div className="flex gap-2 items-center p-2 border-b">
      <Button onClick={() => router.back()}>Back</Button>
      <h1 className="text-2xl">Create New Post</h1>
    </div>
  );
}
