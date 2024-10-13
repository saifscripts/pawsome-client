'use client';

import PostCard from '@/components/post/PostCard';
import { useUser } from '@/hooks/profile.hook';

export default function PostsPage() {
  const { data } = useUser();
  const user = data?.data;

  return (
    <div className="space-y-6">
      {user?.posts.length &&
        user?.posts
          ?.sort((p1, p2) => {
            return (
              new Date(p2.createdAt).getTime() -
              new Date(p1.createdAt).getTime()
            );
          })
          ?.map((post) => (
            <PostCard key={post._id} post={post} author={user} />
          ))}
    </div>
  );
}
