'use client';

import { title } from '@/components/primitives';
import UserCard from '@/components/user/UserCard';
import { useMe } from '@/hooks/user.hook';

export default function FollowingPage() {
  const { data } = useMe();
  const user = data?.data;

  return (
    <div>
      <header className="p-4">
        <h1 className={title({ size: 'sm' })}>Following</h1>
      </header>
      <div>
        {user?.following.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
