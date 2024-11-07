'use client';

import UserCard from '@/components/user/UserCard';
import { useUser } from '@/hooks/user.hook';

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
