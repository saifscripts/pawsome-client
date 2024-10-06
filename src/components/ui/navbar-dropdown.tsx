'use client';

import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { useRouter } from 'next/navigation';

const items = [
  {
    link: '/profile',
    label: 'Profile',
  },
  {
    link: '/dashboard',
    label: 'Dashboard',
  },
  {
    link: '/settings',
    label: 'Settings',
  },
];

export default function NavbarDropdown() {
  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar name="Saif" className="cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        {items.map((item) => (
          <DropdownItem
            key={item.link}
            onClick={() => handleClick(`${item.link}`)}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
