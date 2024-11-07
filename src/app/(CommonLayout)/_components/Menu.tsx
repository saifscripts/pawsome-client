'use client';

import SidebarItem from '@/components/sidebar/SidebarItem';
import SidebarMenu from '@/components/sidebar/SidebarMenu';
import { useMe } from '@/hooks/user.hook';
import { Divider } from '@nextui-org/divider';
import { Fragment } from 'react';
import generateSidebarLinks from './generateSidebarLinks';

export default function Menu() {
  const { data } = useMe();
  const user = data?.data;

  return (
    <div>
      {generateSidebarLinks(user).map((menu) =>
        menu.links.length > 0 ? (
          <Fragment key={menu.title}>
            <SidebarMenu title={menu.title}>
              {menu.links.map((link) => (
                <SidebarItem key={link.title} {...link} />
              ))}
            </SidebarMenu>
            <Divider className="my-4" />
          </Fragment>
        ) : null
      )}
    </div>
  );
}
