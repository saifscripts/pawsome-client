'use client';

import UserCard from '@/components/user/UserCard';
import { useUser } from '@/hooks/profile.hook';

export default function FollowingPage() {
  const { data } = useUser();
  const user = data?.data;

  return (
    <div>
      {user?.following.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}
