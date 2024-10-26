'use client';

import { useUser } from '@/hooks/profile.hook';
import UserCard from '../_components/UserCard';

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
