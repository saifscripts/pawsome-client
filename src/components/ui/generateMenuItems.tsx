import { IUser } from '@/types';

interface INavbarMenuItem {
  label: string;
  href: string;
}

const generateMenuItems = (user: IUser | null, pathname: string) => {
  let menu: INavbarMenuItem[];

  if (pathname.startsWith('/dashboard') && user?.role === 'user') {
    menu = [
      {
        label: 'Dashboard',
        href: '/dashboard',
      },
      {
        label: 'My Subscriptions',
        href: '/dashboard/my-subscriptions',
      },
      {
        label: 'Nutrition Calculator',
        href: '/dashboard/nutrition-calculator',
      },
      {
        label: 'Create Post',
        href: '/dashboard/create-post',
      },
      {
        label: 'My Posts',
        href: '/dashboard/my-posts',
      },
      {
        label: 'Followers',
        href: '/dashboard/followers',
      },
      {
        label: 'Following',
        href: '/dashboard/following',
      },
    ];

    return menu;
  }

  if (pathname.startsWith('/dashboard') && user?.role === 'admin') {
    menu = [
      {
        label: 'Home',
        href: '/dashboard',
      },
      {
        label: 'Payment History',
        href: '/dashboard/payment-history',
      },
      {
        label: 'Nutrition Calculator',
        href: '/dashboard/nutrition-calculator',
      },
      {
        label: 'Manage Posts',
        href: '/dashboard/manage-posts',
      },
      {
        label: 'Create Post',
        href: '/dashboard/create-post',
      },
      {
        label: 'My Posts',
        href: '/dashboard/my-posts',
      },
      {
        label: 'Manage Users',
        href: '/dashboard/manage-users',
      },
      {
        label: 'My Followers',
        href: '/dashboard/followers',
      },
      {
        label: 'My Following',
        href: '/dashboard/following',
      },
    ];

    return menu;
  }

  if (user) {
    menu = [
      {
        label: 'Profile',
        href: `/profile/${user._id}`,
      },
      {
        label: 'Dashboard',
        href: '/dashboard',
      },
      {
        label: 'About Us',
        href: '/about',
      },
      {
        label: 'Contact Us',
        href: '/contact',
      },
    ];

    return menu;
  }

  menu = [
    {
      label: 'About Us',
      href: '/about',
    },
    {
      label: 'Contact Us',
      href: '/contact',
    },
    {
      label: 'Sign In',
      href: '/login',
    },
    {
      label: 'Sign Up',
      href: '/register',
    },
  ];

  return menu;
};

export default generateMenuItems;
