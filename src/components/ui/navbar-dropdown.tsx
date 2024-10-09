'use client';

import { useAuth } from '@/contexts/auth.context';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavbarDropdown() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleClick = (link: string) => {
    router.push(link);
  };

  if (!user) {
    return (
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    );
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onClick={() => handleClick('/profile')}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={() => handleClick('/dashboard')}>
          Dashboard
        </DropdownItem>
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
