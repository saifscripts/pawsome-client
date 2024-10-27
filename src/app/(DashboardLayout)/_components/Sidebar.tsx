import SidebarItem from '@/components/sidebar/SidebarItem';
import SidebarMenu from '@/components/sidebar/SidebarMenu';
import { Divider } from '@nextui-org/divider';
import {
  CalculatorIcon,
  CrownIcon,
  HomeIcon,
  ListIcon,
  PlusIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-[300px] h-full overflow-y-auto border-r border-divider p-4">
      <SidebarMenu title="Menu">
        <SidebarItem
          title="Home"
          icon={<HomeIcon size={16} />}
          path="/dashboard"
        />
        <SidebarItem
          title="Subscriptions"
          icon={<CrownIcon size={16} />}
          path="/dashboard/subscriptions"
        />
        <SidebarItem
          title="Nutrition"
          icon={<CalculatorIcon size={16} />}
          path="/dashboard/nutrition"
        />
        <SidebarItem
          title="Settings"
          icon={<SettingsIcon size={16} />}
          path="/dashboard/settings"
        />
      </SidebarMenu>
      <Divider className="my-4" />
      <SidebarMenu title="Posts">
        <SidebarItem
          title="Create Post"
          icon={<PlusIcon size={16} />}
          path="/dashboard/create-post"
        />
        <SidebarItem
          title="My Posts"
          icon={<ListIcon size={16} />}
          path="/dashboard/my-posts"
        />
      </SidebarMenu>
      <Divider className="my-4" />
      <SidebarMenu title="Users">
        <SidebarItem
          title="Followers"
          icon={<UsersIcon size={16} />}
          path="/dashboard/followers"
        />
        <SidebarItem
          title="Following"
          icon={<UsersIcon size={16} />}
          path="/dashboard/following"
        />
      </SidebarMenu>
    </aside>
  );
}
