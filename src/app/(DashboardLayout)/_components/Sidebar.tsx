import SidebarItem from '@/components/sidebar/SidebarItem';
import SidebarMenu from '@/components/sidebar/SidebarMenu';
import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import { getCurrentUser } from '@/services/auth.service';
import { IUserRole } from '@/types';
import { Divider } from '@nextui-org/divider';
import { Fragment } from 'react';
import sidebarLinks from './sidebarLinks';

export default async function Sidebar() {
  const user = await getCurrentUser();

  return (
    <aside className="hidden lg:block w-[300px] h-full overflow-y-auto border-r border-divider p-4">
      {sidebarLinks[user?.role as IUserRole].map((menu) => (
        <Fragment key={menu.title}>
          <SidebarMenu title={menu.title}>
            {menu.links.map((link) => (
              <SidebarItem key={link.title} {...link} />
            ))}
          </SidebarMenu>
          <Divider className="my-4" />
        </Fragment>
      ))}
      <SubscriptionCard />
    </aside>
  );
}
