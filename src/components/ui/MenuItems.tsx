'use client';

import { useAuth } from '@/contexts/auth.context';
import { NavbarMenuItem } from '@nextui-org/navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import generateMenuItems from './generateMenuItems';

export default function MenuItems({
  setIsMenuOpen,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <div className="mx-4 mt-2 flex flex-col gap-4">
      {generateMenuItems(user, pathname).map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            color="foreground"
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        </NavbarMenuItem>
      ))}
    </div>
  );
}
