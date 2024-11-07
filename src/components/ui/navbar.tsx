'use client';

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar';

import { ThemeSwitch } from '@/components/ui/theme-switch';
import { useAuth } from '@/contexts/auth.context';
import { cn } from '@/lib/cn';
import { PawPrintIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import CreatePostButton from './CreatePostButton';
import generateMenuItems from './generateMenuItems';
import MenuItems from './MenuItems';
import NavbarDropdown from './navbar-dropdown';
import SearchInput from './SearchInput';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <NextUINavbar
      maxWidth="full"
      height={64}
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 md:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-2" href="/">
            <PawPrintIcon className="w-6 h-6" />
            <p className="font-semibold text-inherit">
              <span className="text-primary-500">PAW</span>SOME
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {!pathname.startsWith('/dashboard') && (
        <NavbarContent
          className="hidden md:flex lg:hidden basis-full"
          justify="center"
        >
          {generateMenuItems(user, pathname).map((item, index) => (
            <Link
              key={`${item}-${index}`}
              color="foreground"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm"
            >
              {item.label}
            </Link>
          ))}
        </NavbarContent>
      )}

      <NavbarContent
        className={cn('hidden', {
          'lg:flex': pathname.startsWith('/dashboard'),
          'md:flex': !pathname.startsWith('/dashboard'),
        })}
        justify="end"
      >
        <ThemeSwitch />
        <CreatePostButton />
        <NavbarItem>
          <SearchInput />
        </NavbarItem>
        <NavbarDropdown />
      </NavbarContent>

      <NavbarContent
        className={cn('basis-1 pl-4', {
          'lg:hidden': pathname.startsWith('/dashboard'),
          'md:hidden': !pathname.startsWith('/dashboard'),
        })}
        justify="end"
      >
        <ThemeSwitch />
        <NavbarDropdown />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <SearchInput />
        <MenuItems setIsMenuOpen={setIsMenuOpen} />
      </NavbarMenu>
    </NextUINavbar>
  );
};
