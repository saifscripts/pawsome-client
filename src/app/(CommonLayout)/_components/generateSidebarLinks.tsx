import { IUser } from '@/types';
import {
  CalculatorIcon,
  CrownIcon,
  HomeIcon,
  InfoIcon,
  LayoutDashboardIcon,
  MessageCircleIcon,
  PlusIcon,
  UserIcon,
} from 'lucide-react';

interface ISidebarMenu {
  title: string;
  links: ISidebarLink[];
}

interface ISidebarLink {
  title: string;
  icon: React.ReactNode;
  path: string;
  antiActiveParams?: { key: string; value: string }[];
  activeParams?: { key: string; value: string }[];
}

const generateSidebarLinks = (user?: IUser) => {
  const feed: ISidebarMenu = {
    title: 'Feed',
    links: [
      {
        title: 'All Posts',
        icon: <HomeIcon size={16} />,
        path: '/',
        antiActiveParams: [{ key: 'feed', value: 'following' }],
      },
    ],
  };

  const menu: ISidebarMenu = {
    title: 'Menu',
    links: [],
  };

  const shortcuts: ISidebarMenu = {
    title: 'Shortcuts',
    links: [
      {
        title: 'Create Post',
        icon: <PlusIcon size={16} />,
        path: '/dashboard/create-post',
      },
      {
        title: 'Nutrition Calculator',
        icon: <CalculatorIcon size={16} />,
        path: '/dashboard/nutrition-calculator',
      },
    ],
  };

  if (user) {
    feed.links.push(
      ...[
        {
          title: 'Following',
          icon: <UserIcon size={16} />,
          path: '/',
          activeParams: [{ key: 'feed', value: 'following' }],
        },
      ]
    );

    menu.links.push(
      ...[
        {
          title: 'Profile',
          icon: <UserIcon size={16} />,
          path: `/profile/${user._id}`,
        },
        {
          title: 'Dashboard',
          icon: <LayoutDashboardIcon size={16} />,
          path: '/dashboard',
        },
      ]
    );
  }

  if (user && user.userType === 'premium') {
    shortcuts.links.push(
      ...[
        {
          title: 'My Subscription',
          icon: <CrownIcon size={16} />,
          path: '/dashboard/my-subscription',
        },
      ]
    );
  }

  menu.links.push(
    ...[
      {
        title: 'About Us',
        icon: <InfoIcon size={16} />,
        path: '/about',
      },
      {
        title: 'Contact Us',
        icon: <MessageCircleIcon size={16} />,
        path: '/contact',
      },
    ]
  );

  return [feed, menu, shortcuts];
};

export default generateSidebarLinks;
