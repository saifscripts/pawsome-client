'use client';

import { Button } from '@nextui-org/button';
import { HomeIcon, UserIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SidebarMenu() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div>
      <div>
        <h4 className="text-sm font-medium mb-1">Feed</h4>
        <div className="flex flex-col gap-1 ml-2">
          <Button
            onClick={() => {
              router.push('/?feed=all');
            }}
            variant={
              !searchParams.get('feed') || searchParams.get('feed') === 'all'
                ? 'flat'
                : 'light'
            }
            color={
              !searchParams.get('feed') || searchParams.get('feed') === 'all'
                ? 'primary'
                : 'default'
            }
            className="w-full justify-start"
          >
            <HomeIcon size={16} />
            All Posts
          </Button>

          <Button
            onClick={() => {
              router.push('/?feed=following');
            }}
            variant={
              searchParams.get('feed') === 'following' ? 'flat' : 'light'
            }
            color={
              searchParams.get('feed') === 'following' ? 'primary' : 'default'
            }
            className="w-full justify-start"
          >
            <UserIcon size={16} />
            Following
          </Button>
        </div>
      </div>
    </div>
  );
}
