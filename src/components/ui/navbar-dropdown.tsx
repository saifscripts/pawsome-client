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
import { User } from '@nextui-org/user';
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
        <Button variant="solid" color="primary" className="rounded-lg">
          Sign in
        </Button>
      </Link>
    );
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          size="sm"
          className="transition-transform"
          src={user?.avatarURL}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          onClick={() => handleClick(`/profile/${user._id}`)}
          key="profile"
          className="h-14 gap-2 opacity-100"
        >
          <User
            name={user?.name}
            description={`@${user?.email.split('@')[0]}`}
            classNames={{
              name: 'text-default-600',
              description: 'text-default-500',
            }}
            avatarProps={{
              size: 'sm',
              src: user?.avatarURL || '',
            }}
          />
        </DropdownItem>
        <DropdownItem onClick={() => handleClick(`/profile/${user._id}`)}>
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
