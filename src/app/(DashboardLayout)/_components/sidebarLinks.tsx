import { USER_ROLE } from '@/constants';
import {
  CalculatorIcon,
  ChartNoAxesGanttIcon,
  CreditCardIcon,
  CrownIcon,
  HomeIcon,
  ListIcon,
  PlusIcon,
  UserRoundCogIcon,
  UsersIcon,
} from 'lucide-react';

const sidebarLinks = {
  [USER_ROLE.USER]: [
    {
      title: 'Menu',
      links: [
        {
          title: 'Dashboard',
          icon: <HomeIcon size={16} />,
          path: '/dashboard',
        },
        {
          title: 'My Subscriptions',
          icon: <CrownIcon size={16} />,
          path: '/dashboard/my-subscriptions',
        },
        {
          title: 'Nutrition Calculator',
          icon: <CalculatorIcon size={16} />,
          path: '/dashboard/nutrition-calculator',
        },
      ],
    },
    {
      title: 'Posts',
      links: [
        {
          title: 'Create Post',
          icon: <PlusIcon size={16} />,
          path: '/dashboard/create-post',
        },
        {
          title: 'My Posts',
          icon: <ListIcon size={16} />,
          path: '/dashboard/my-posts',
        },
      ],
    },
    {
      title: 'Users',
      links: [
        {
          title: 'Followers',
          icon: <UsersIcon size={16} />,
          path: '/dashboard/followers',
        },
        {
          title: 'Following',
          icon: <UsersIcon size={16} />,
          path: '/dashboard/following',
        },
      ],
    },
  ],
  [USER_ROLE.ADMIN]: [
    {
      title: 'Dashboard',
      links: [
        {
          title: 'Home',
          icon: <HomeIcon size={16} />,
          path: '/dashboard',
        },
        {
          title: 'Payment History',
          icon: <CreditCardIcon size={16} />,
          path: '/dashboard/payment-history',
        },
        {
          title: 'Nutrition Calculator',
          icon: <CalculatorIcon size={16} />,
          path: '/dashboard/nutrition-calculator',
        },
      ],
    },
    {
      title: 'Posts',
      links: [
        {
          title: 'Manage Posts',
          icon: <ChartNoAxesGanttIcon size={16} />,
          path: '/dashboard/manage-posts',
        },
        {
          title: 'Create Post',
          icon: <PlusIcon size={16} />,
          path: '/dashboard/create-post',
        },
        {
          title: 'My Posts',
          icon: <ListIcon size={16} />,
          path: '/dashboard/my-posts',
        },
      ],
    },
    {
      title: 'Users',
      links: [
        {
          title: 'Manage Users',
          icon: <UserRoundCogIcon size={16} />,
          path: '/dashboard/manage-users',
        },
        {
          title: 'My Followers',
          icon: <UsersIcon size={16} />,
          path: '/dashboard/followers',
        },
        {
          title: 'My Following',
          icon: <UsersIcon size={16} />,
          path: '/dashboard/following',
        },
      ],
    },
  ],
};

export default sidebarLinks;
