'use client';

import { useUser } from '@/hooks/profile.hook';
import UserCard from '../_components/UserCard';

export default function FollowersPage() {
  const { data } = useUser();
  const user = data?.data;

  return (
    <div>
      {user?.followers.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}
