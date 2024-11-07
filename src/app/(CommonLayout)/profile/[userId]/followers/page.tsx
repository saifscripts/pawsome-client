'use client';

import UserCard from '@/components/user/UserCard';
import { useUser } from '@/hooks/user.hook';
import { UserCardSkeleton } from '../_components/ProfileSkeleton';

export default function FollowersPage() {
  const { data, isLoading } = useUser();
  const user = data?.data;

  if (isLoading) return <UserCardSkeleton />;

  return (
    <div>
      {user?.followers.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}
