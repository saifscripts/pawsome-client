'use client';

import { useAuth } from '@/contexts/auth.context';
import { Button } from '@nextui-org/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function CreatePostButton() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Link href="/create-post">
      <Button variant="flat" color="primary">
        <PlusIcon />
        Create Post
      </Button>
    </Link>
  );
}
