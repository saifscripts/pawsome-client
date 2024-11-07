'use client';

import { useUser } from '@/hooks/user.hook';
import { Chip } from '@nextui-org/chip';
import { Tabs as NextTabs, Tab } from '@nextui-org/tabs';
import { SquarePenIcon, UserCheckIcon, UserPlusIcon } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function Tabs() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useParams();
  const { data } = useUser();
  const user = data?.data;

  const tabs = [
    {
      path: `/profile/${userId}`,
      title: 'Posts',
      icon: SquarePenIcon,
      value: user?.posts?.length,
    },
    {
      path: `/profile/${userId}/following`,
      title: 'Following',
      icon: UserPlusIcon,
      value: user?.following?.length,
    },
    {
      path: `/profile/${userId}/followers`,
      title: 'Followers',
      icon: UserCheckIcon,
      value: user?.followers?.length,
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <NextTabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        selectedKey={pathname}
        classNames={{
          tabList:
            'gap-6 w-full relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full bg-[#22d3ee]',
          tab: 'max-w-fit px-0 h-12',
          tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
        }}
        onSelectionChange={(path) => router.replace(path as string)}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.path}
            title={
              <div className="flex items-center space-x-2 px-4">
                <tab.icon />
                <span>{tab.title}</span>
                <Chip size="sm" variant="faded">
                  {tab.value}
                </Chip>
              </div>
            }
          />
        ))}
      </NextTabs>
    </div>
  );
}
