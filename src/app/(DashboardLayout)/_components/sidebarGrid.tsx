import { USER_ROLE } from '@/constants';
import {
  CalculatorIcon,
  ChartNoAxesGanttIcon,
  CreditCardIcon,
  CrownIcon,
  ListIcon,
  PlusIcon,
  UserRoundCogIcon,
  UsersIcon,
} from 'lucide-react';

const sidebarGrid = {
  [USER_ROLE.USER]: [
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
  [USER_ROLE.ADMIN]: [
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
    {
      title: 'Manage Users',
      icon: <UserRoundCogIcon size={16} />,
      path: '/dashboard/manage-users',
    },
  ],
};

export default sidebarGrid;
