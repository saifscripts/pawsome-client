import SidebarItem from '@/components/sidebar/SidebarItem';
import SidebarMenu from '@/components/sidebar/SidebarMenu';
import { HomeIcon, UserIcon } from 'lucide-react';

export default function Menu() {
  return (
    <div>
      <SidebarMenu title="Feed">
        <SidebarItem
          title="All Posts"
          icon={<HomeIcon size={16} />}
          path="/"
          antiActiveParams={[{ key: 'feed', value: 'following' }]}
        />
        <SidebarItem
          title="Following"
          icon={<UserIcon size={16} />}
          path="/"
          activeParams={[{ key: 'feed', value: 'following' }]}
        />
      </SidebarMenu>
    </div>
  );
}
